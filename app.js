const db = require('./database');
const express = require("express");
var app = express();
const http = require("http");
const { UserModel } = require('./database');
var server = http.createServer(app);
var io = require("socket.io")(server);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { assert } = require("console");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser=bodyParser.json({ extended: false });

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
const randomFns=()=> { 
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code 
}
const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

// send email
app.post("/send_email", urlencodedParser,async(req,res)=>{
    var response={
        "email":req.body.email,
        "password":req.body.password,
        "password_confirm":req.body.password_confirm
    };
    let EMAIL=response["email"]
    if(regEmail.test(EMAIL)){
        let code=randomFns();
        transport.sendMail({
            from: '2911528281@qq.com', 
            to: EMAIL, 
            subject: 'Email verification', 
            html: `
            <p>Hello!</p>
            <p>You are registering as a member of UTransorm!</p>
            <p>Your Auth Code：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***The Auth Code is valid within 5 minutes***</p>` 
        },
        function(error,data){
            assert(!error,500,"[ERROR] fail to send Auth Code!")
            transport.close();
        });
        const authCode = require("../models/authCode");
        const e_mail = EMAIL;
        await authCode.deleteMany({e_mail});
        await authCode.insertMany({e_mail,ayth_code:code});
        setTimeout(async ()=>{   
            await Code.deleteMany({e_mail})
        },1000*60*5);
    }else{
        assert(false,422,'Wrong email format!')
    }
}
);


app.use(express.static(__dirname + '/build'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html')
});

io.sockets.on('connection',function (socket){
    console.log("Logged");
});

const UserChangeStream = UserModel.watch();
const GoodChangeStream = GoodModel.watch();

UserChangeStream.on('change', (changes) => {
            io.sockets.compress(true).emit('userChange',changes);
            console.log("Something changed");
        });
GoodChangeStream.on('change', (changes) => {
            io.sockets.compress(true).emit('goodChange',changes);
            console.log("good changed");
        });




app.post('/register', (req, res) => {
    console.log("Hello");

    console.log(req.body);
    console.log("done");
    db.createUser(req.body.name, req.body.password, req.body.email, req.body.school)
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
});

app.get('/find_user',(req, res)=>{
    db.findUser("leslie").then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );   
})

app.post('/add_good',(req,res)=>{
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


app.get('find_all_goods',(req,res)=>{
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

app.post('/add_chat', jsonParser, (req,res)=>{
    console.log(req.body);
})

server.listen(3000)
