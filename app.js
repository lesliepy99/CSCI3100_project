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

UserChangeStream.on('change', (changes) => {
    io.sockets.compress(true).emit('userChange', changes);
    console.log("Something changed");
});
GoodChangeStream.on('change', (changes) => {
    io.sockets.compress(true).emit('goodChange', changes);
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
    var veri_result="true";
    if (!veri){
        console.log("wrong auth code!");
        veri_result="false";
    }
    else{
        db.createUser(nickname, password, email, school);  
        console.log("right auth code!");
        await db.deleteAuthCode(email);
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

app.post('/add_good', (req, res) => {
    console.log(req.body);
    db.createGood(req.body.name, req.body.userId, req.body.tags, req.body.number_of_views, req.body.number_of_likes, req.body.good_image, req.body.description, req.body.estimated_price)
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


app.get('find_all_goods', (req, res) => {
    db.findAllGoods().then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
});

{/*app.post('/add_chat',(req,res)=>{
    console.log(req.body);
    db.createChatItem([req.body.uid_1, req.body.uid_2], req.body.message)
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
})*/}

app.post('/add_chat', jsonParser, (req, res) => {
    console.log(req.body);
})

server.listen(3000)
