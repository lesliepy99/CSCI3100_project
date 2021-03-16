const mongoose = require('mongoose');
var dbUri = "mongodb+srv://csci3100_project_team:csci3100project@cluster0.muf9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

var Schema = mongoose.Schema;
mongoose.connect(dbUri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection:error:'));

db.once('open',function(){
    console.log("Mongodb connected!");
})