const db = require('./database');
const express = require("express");
var app = express();
const http = require("http");
const { UserModel } = require('./database');
var server = http.createServer(app);
var io = require("socket.io")(server);


app.use(express.static(__dirname + '/build'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html')
});

io.sockets.on('connection',function (socket){
    console.log("Logged");
})

const changeStream = UserModel.watch();


changeStream.on('change', (changes) => {
            io.sockets.compress(true).emit('mongoStream',changes);
            console.log("Something changed");

        });




app.post('/register', (req, res) => {
    console.log("Hello");

    console.log(req.body);
    console.log("done");
    db.createUser(name, password, email, school)
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
    db.findUser("Leslie").then(
        re => { res.send(JSON.stringify(re)) },
        err => { res.status(500).send(err.toString()) }
    );   
})

server.listen(3000)
