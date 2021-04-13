const db = require('./database');
const express = require("express");
var app = express();
const http = require("http");
const { UserModel, AuthCodeModel } = require('./database');
var server = http.createServer(app);
var io = require("socket.io")(server);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { assert } = require("console");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json({ extended: false });

const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '2911528281@qq.com',
        pass: 'gjmjcxjailojdedh'
    }
}));

// generate random auth code
const randomFns = () => {
    let code = ""
    for (let i = 0; i < 6; i++) {
        code += parseInt(Math.random() * 10)
    }
    return code
}

// send email
app.post("/send_email", jsonParser, async (req, res) => {
    const EMAIL = req.body.email;
    var email_exist=await db.findUser(EMAIL);
    var isSend=true;
    if(email_exist){
        console.log("the email has signed up before!");
        isSend=false;
    }
    else{
        const code = randomFns();
        transport.sendMail({
            from: '"UTransform Service" <2911528281@qq.com>',
            to: EMAIL,
            subject: 'Email verification',
            html: `
                <p>Hello!</p>
                <p>You are registering as a member of UTransorm!</p>
                <p>Your Auth Code：<strong style="color: #ff4e2a;">${code}</strong></p>
                <p>***The Auth Code is valid within 5 minutes***</p>`
            },
            function (error, data) {
                assert(!error, 500, "[ERROR] fail to send Auth Code!")
                transport.close();
            }
        );
        const e_mail = EMAIL;
        await db.deleteAuthCode(e_mail);
        await db.addAuthPair( e_mail, code );
        setTimeout(async () => {
            await db.deleteAuthCode(e_mail)
        }, 1000 * 60 * 5);
    }
    return res.json({isSend: isSend});
}
);


app.use(express.static(__dirname + '/build'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html')
});

io.sockets.on('connection', function (socket) {
    console.log("Logged");
});

const UserChangeStream = UserModel.watch();
const GoodChangeStream = GoodModel.watch();
const PostChangeStream = PostModel.watch();

UserChangeStream.on('change', (changes) => {
    io.sockets.compress(true).emit('userChange', changes);
    console.log(changes)
    console.log("Something changed");
});
GoodChangeStream.on('change', (changes) => {
    io.sockets.compress(true).emit('goodChange', changes);
    console.log("good changed");
});
PostChangeStream.on('change', (changes) => {
    io.sockets.compress(true).emit('postChange', changes);
    console.log("good changed");
});




app.post('/register', jsonParser, async (req, res) => {
    console.log(req.body);
    const email= req.body.email;
    const password=req.body.password;
    const nickname=req.body.nickname;
    const school=req.body.school;
    const authcode=req.body.authcode;
    const veri=await AuthCodeModel.findOne({"auth_pair.email":email,"auth_pair.authcode":authcode});
    var veri_result=true;
    if (!veri){
        console.log("wrong auth code!");
        veri_result=false;
    }
    else{
        db.createUser(nickname, password, email, school);  
        console.log("right auth code!");
        await db.deleteAuthCode(email);
    }
    return res.json({veri_result: veri_result});
});

app.post('/login', jsonParser, async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    const veri = await UserModel.findOne({email:email, password: password});
    var veri_result=true;
    console.log(veri);
    if(!veri){
        veri_result=false;
        console.log("Wrong email or password!");
    }
    else{
        /*TODO*/ 
    }
    return res.json({veri_result: veri_result});
});

app.post('/find_user', jsonParser, (req, res) => {
    const email = req.body.email;
    db.findUser(email).then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
})

app.get('/find_all_users',(req,res)=>{
    db.findAllUsers().then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
})

app.post('/insertShoppingList',jsonParser, (req, res) => {
    console.log(req.body);
    const user_id = req.body.user_id;
    const good_id = req.body.good_id;
    db.insertShoppingList(user_id,good_id)
        .then(
            result => {
                if (result) {
                    res.status(200).send("Registered!");
                }
                else {
                    res.status(403).send("Overlapped!");
                }
            },
            err => { res.status(500).send(err.toString()) }
        );
})

app.post('/add_good',jsonParser, (req, res) => {
    console.log(req.body);
    
    const name = req.body.name;
    const userId = req.body.userId;
    const tags = req.body.tags;
    const number_of_views = req.body.number_of_views;
    const number_of_likes = req.body.number_of_likes;
    const description = req.body.description;
    const estimated_price = req.body.estimated_price;

    db.createGood(
        name, 
        userId, 
        tags, 
        number_of_views, 
        number_of_likes, 
        description, 
        estimated_price)
        .then(
            result => {
                if (result) {
                    res.status(200).send("Registered!");
                }
                else {
                    res.status(403).send("Overlapped!");
                }
            },
            err => { res.status(500).send(err.toString()) }
        );
})


app.get('/find_all_goods', (req, res) => {
    db.findAllGoods().then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
});

app.get('/find_all_posts', (req, res) => {
    db.findAllPosts().then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
});

app.post('/add_post', urlencodedParser,(req, res) => {
    console.log(req.body);
    const senderId = req.body.senderId;
    const content = req.body.content;
    const comments = req.body.comments;
    db.createPost({ senderId,content,comments })
        .then(
            result => {
                if (result) {
                    res.status(200).send("Registered!");
                }
                else {
                    res.status(403).send("Overlapped!");
                }
            },
            err => { res.status(500).send(err.toString()) }
        );
})


app.post('/add_post_comment', urlencodedParser,(req, res) => {
    console.log(req.body);
    const postId = req.body.postId;
    const senderId = req.body.senderId;
    const content = req.body.content;
    db.addPostComment({postId, senderId, content})
        .then(
            result => {
                if (result) {
                    res.status(200).send("Registered!");
                }
                else {
                    res.status(403).send("Overlapped!");
                }
            },
            err => { res.status(500).send(err.toString()) }
        );
})

app.post('/find_specific_chat', urlencodedParser,(req, res) => {
    console.log(req.body);
    const two_user_id = req.body.two_user_id;
    
    db.findSpecificChats({two_user_id})
        .then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
        );
})

app.post('/create_chat', urlencodedParser,(req, res) => {
    console.log(req.body);
   
    const two_user_id = req.body.two_user_id;
    const new_message = req.body.new_message;
    db.createChatItem({two_user_id, new_message})
        .then(
            result => {
                if (result) {
                    res.status(200).send("Registered!");
                }
                else {
                    res.status(403).send("Overlapped!");
                }
            },
            err => { res.status(500).send(err.toString()) }
        );
})


app.post('/create_transaction', urlencodedParser,(req, res) => {
    console.log(req.body);
   
    const good_id = req.body.good_id;
    const seller_id = req.body.seller_id;
    const consumer_id = req.body.comsumer_id;
    const transaction_time = req.body.transaction_time;
    db.createChatItem({good_id, seller_id, consumer_id, transaction_time})
        .then(
            result => {
                if (result) {
                    res.status(200).send("Registered!");
                }
                else {
                    res.status(403).send("Overlapped!");
                }
            },
            err => { res.status(500).send(err.toString()) }
        );
})


app.post('/find_specific_transaction', urlencodedParser,(req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const type = req.body.type;
    db.findSpecificTransactions({type, id})
        .then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
        );
})

server.listen(3000)
