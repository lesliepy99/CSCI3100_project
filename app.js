/*
*SERVER MODULE
*PROGRAMMER: PU Yuan
*VERSION: 1.0 (28 April 2021)
*
*PURPOSE: general-purpose server, provide intereaction between clients and database
*/

/**
 * Module dependencies and prototypes.
 */
const db = require('./database');
const express = require("express");
var app = express();
const http = require("http");
const { UserModel, AuthCodeModel, TransactionModel, ChatModel } = require('./database');
var server = http.createServer(app);
var io = require("socket.io")(server);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { assert } = require("console");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json({ extended: false });


// Specify the configuration of the email account to send auth code
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
    var email_exist=await UserModel.findOne({email: EMAIL});
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



/**
 * Set static path to provide static files.
 */
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/src/admin'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html')
});


//Listen on the login activities
io.sockets.on('connection', function (socket) {
    console.log("Logged");
});

/**
 * Set up stream listeners and socket.io for mongodb models
 *
 *   - UserModel
 *   - GoodModel
 *   - Transaction model
 *   - ChatModel
 *
 */


const UserChangeStream = UserModel.watch();
const GoodChangeStream = GoodModel.watch();
const PostChangeStream = PostModel.watch();
const TransactionChangeStream = TransactionModel.watch();
const ChatChangeStream = ChatModel.watch();

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
    console.log("post changed");
});

TransactionChangeStream.on('change', (changes) => {
    io.sockets.compress(true).emit('TransactionChange', changes);
    console.log("transaction changed");
});
ChatChangeStream.on('change', (changes) => {
    io.sockets.compress(true).emit('ChatChange', changes);
    console.log("chat changed");
});


/**
 * DESCRIPTION: a REST API to return main page of the app to clients
 * URL: /admin
 * METHOD: GET
 */
app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/src/admin/admin_page.html')
});


/**
 * DESCRIPTION: a REST API to authticate the login information of administrators
 * URL: /admin_login
 * METHOD: POST
 * Parameters: 
 *   - username : STRING
 *   - password : STRING
 */
app.post('/admin_login', urlencodedParser, async (req, res) => {
    console.log(req.body);
    const password=req.body.password;
    const username=req.body.username;
    db.verifyUser(username,password).then(
        re => {
		console.log(re);
	if(re==undefined){
		console.log("receive");
		res.status(400).send("Wrong password or username");
	}
		else{
        console.log("right") ;
        res.sendFile(__dirname + '/src/admin/manage_page.html')}
    },
        err => { res.sendFile(__dirname + '/src/admin/admin_page.html');
     }
    );
});

/**
 * DESCRIPTION: a REST API to register a user, the procedures including:
 *              (1). Verify the auth_code
 *              (2). If auth_code is verified, insert a new user document to database
 * URL: /register
 * METHOD: POST
 * Parameters: 
 *   - email : STRING
 *   - password : STRING
 *   - nickname : STRING
 *   - school : STRING
 *   - authcode : STRING
 */
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

/**
 * DESCRIPTION: a REST API to authticate the login information of common users
 * URL: /admin_login
 * METHOD: POST
 * Parameters: 
 *   - email : STRING
 *   - password : STRING
 */
app.post('/login', jsonParser, async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    const veri = await UserModel.findOne({email:email, password: password});
    var my_id=null;
    console.log(veri);
    if(!veri){
        console.log("Wrong email or password!");
    }
    else{
        my_id=veri._id;
    }
    return res.json({my_id: my_id});
});


/**
 * DESCRIPTION: a REST API to find and return the information of a specific registered user
 * URL: /find_user
 * METHOD: POST
 * Parameters: 
 *   - uid : STRING
 */
app.post('/find_user', jsonParser, (req, res) => {
    const uid = req.body.uid;
    db.findUser(uid).then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
})

/**
 * DESCRIPTION: a REST API to find and return the information of all specific registered users
 * URL: /find_all_users
 * METHOD: GET
 * Parameters: NONE
 */
app.get('/find_all_users',(req,res)=>{
    db.findAllUsers().then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
})


/**
 * DESCRIPTION: a REST API to insert the id of a specific good into the shopping list data structure of a user
 * URL: /insertShoppingList
 * METHOD: POST
 * Parameters: 
 *   - user_id : STRING
 *   - good_id : STRING
 */
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

/**
 * DESCRIPTION: a REST API to delete the id of a specific good into from shopping list data structure of a user
 * URL: /deleteShoppingListItem
 * METHOD: POST
 * Parameters: 
 *   - user_id : STRING
 *   - good_id : STRING
 */
app.post('/deleteShoppingListItem',jsonParser, (req, res) => {
    console.log(req.body);
    const user_id = req.body.user_id;
    const good_id = req.body.good_id;
    db.deleteShoppingListItem(user_id,good_id)
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


/**
 * DESCRIPTION: a REST API to insert a good document to the database
 * URL: /add_good
 * METHOD: POST
 * Parameters: 
 *   - user_id : STRING
 *   - name : STRING
 *   - tags : ARRAY of STRING
 *   - number_of_views : NUMBER
 *   - number_of_likes : NUMBER
 *   - description : STRING
 *   - estimated_price: Number
 */
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
                    res.status(200).send(result);
                }
                else {
                    res.status(403).send("Overlapped!");
                }
            },
            err => { res.status(500).send(err.toString()) }
        );
})

/**
 * DESCRIPTION: a REST API to find and return the information of all goods
 * URL: /find_all_goods
 * METHOD: GET
 * Parameters: NONE
 */
app.get('/find_all_goods', (req, res) => {
    db.findAllGoods().then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
});

/**
 * DESCRIPTION: a REST API to find and return the information of all posts
 * URL: /find_all_posts
 * METHOD: GET
 * Parameters: NONE
 */
app.get('/find_all_posts', (req, res) => {
    db.findAllPosts().then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );
});

/**
 * DESCRIPTION: a REST API to insert a post document to the database
 * URL: /add_post
 * METHOD: POST
 * Parameters: 
 *   - sender_id : STRING
 *   - content : STRING
 *   - comments : ARRAY of STRING
 */
app.post('/add_post', jsonParser,(req, res) => {
    console.log("body")
    console.log(req.body);
    const senderId = req.body.senderId;
    const content = req.body.content;
    const comments = req.body.comments;
    db.createPost( senderId,content,comments )
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


/**
 * DESCRIPTION: a REST API to insert a comment to a specific post 
 * URL: /add_post_comment
 * METHOD: POST
 * Parameters: 
 *   - postId : STRING
 *   - senderId : STRING
 *   - content : STRING
 */
app.post('/add_post_comment',jsonParser,(req, res) => {
    console.log(req.body);
    const postId = req.body.postId;
    const senderId = req.body.senderId;
    const content = req.body.content;
    db.addPostComment(postId, senderId, content)
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

/**
 * DESCRIPTION: a REST API to find all chat messages of a specific user
 * URL: /find_specific_chat
 * METHOD: POST
 * Parameters: 
 *   - id : STRING
 */
app.post('/find_specific_chat', jsonParser,(req, res) => {
    const id = req.body.id;
    db.findSpecificChats({id})
        .then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
        );
})

/**
 * DESCRIPTION: a REST API such that if the chat document already exists between two
 *              users, insert a chat message to that document; else, create a chat
 *              document between the two users
 * URL: /create_chat
 * METHOD: POST
 * Parameters: 
 *   - uid_1 : STRING
 *   - uid_2 : STRING
 *   - message_content : STRING 
 *   - send_time : DATE
 */
app.post('/create_chat',jsonParser,(req, res) => {
    const uid_1 = req.body.uid_1;
    const uid_2 = req.body.uid_2;
    const two_user_id = [{'id':uid_1}, {'id': uid_2}];
    const message_content = req.body.message_content;
    const send_time = req.body.send_time;
    
   
    db.createChatItem(two_user_id, message_content, uid_1, send_time) .then(
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
});

/**
 * DESCRIPTION: a REST API such that create a transaction record and add to database
 * URL: /create_transaction
 * METHOD: POST
 * Parameters: 
 *   - good_id : STRING
 *   - seller_id : STRING
 *   - consumer_id : STRING 
 *   - transaction_time : DATE
 */
app.post('/create_transaction', jsonParser,(req, res) => {
    console.log(req.body);
    const good_id = req.body.good_id;
    const seller_id = req.body.seller_id;
    const consumer_id = req.body.consumer_id;
    const transaction_time = req.body.transaction_time;
    db.createTransaction(good_id, seller_id, consumer_id, transaction_time)
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


/**
 * DESCRIPTION: a REST API to find all specific transactions where the specific user is involved
 * URL: /find_specific_transaction
 * METHOD: POST
 * Parameters: 
 *   - id : STRING
 */
app.post('/find_specific_transaction', jsonParser,(req, res) => {
    console.log(req.body);
    const id = req.body.id;
   
    db.findSpecificTransactions({id})
        .then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
        );
})

/**
 * Configure the port to be 3000
 */
server.listen(3000)
