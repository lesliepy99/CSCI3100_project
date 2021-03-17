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

var UserSchama = Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    school:{type:String,required:true},
    year:{type:Number},
    ranki:{type:String},
    location:{type:String},
    chat_list:[{
        userId:{type:Schema.ObjectId},
        last_chat_time:{type:Date},
        most_recent_message:{type:String},
        unread_count:{type:Number}
        }]
});

UserModel = mongoose.model('User',UserSchama);

createUser = (name,password,email,school)=> new Promise((resolve,reject)=>{
    UserModel.findOne({email:email},(err,user)=>{
        if(err) reject(err);
        else if(!user){
            UserModel.create({name:name,password:password,email:email,school:school},(err,result)=>{
               if (err || !result) reject(err);
               else {
                   resolve(true);
               }
            });
        }
        else{
            resolve(false);
        }
    });
 })

 module.exports = {
    createUser : createUser
  };