const express = require('express');
const app = express();
const db = require('./database');

app.use(express.static(__dirname + '/build'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html')
});


app.post('/register',(req,res)=>{
    console.log("Hello");
    
    console.log(req.body);
    console.log("done");
    db.createUser(name,password,email,school)
       .then(
           result=>{
               if(result){
                   res.status(200).send("Registered!");
               }
               else{
                   res.status(403).send("Overlapped!");
               }
           },
           err=>{res.status(500).send(err.toString())}
       );   
});
app.listen(3000);