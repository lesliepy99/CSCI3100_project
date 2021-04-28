/*
*MODULE DATABASE
*PROGRAMMER: PU Yuan
*VERSION: 1.0 (28 April 2021)
*PURPOSE: provide APIs (or functions) which can intereact with databse to the server
*/

/**
 * Module dependencies and prototypes.
 */
const { Email } = require('@material-ui/icons');
const mongoose = require('mongoose');
var dbUri = "mongodb+srv://csci3100_project_team:csci3100project@cluster0.muf9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var ObjectId = require('mongoose').Types.ObjectId; 
var Schema = mongoose.Schema;

/**
 * Try to connect to the mongodb database
 */
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection:error:'));

db.once('open', function () {
    console.log("Mongodb connected!");
})

/**
 * Define the following document models for mongodb
 *
 *   - UserModel
 *   - GoodModel
 *   - Transaction model
 *   - ChatModel
 *   - AuthcodeModel
 *   - AdminModel
 *
 */
var UserSchema = Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    school: { type: String, required: true },
    rank: { type: String },
    
    location: { type: String },
    chat_list: [{
        userId: { type: Schema.ObjectId },
        last_chat_time: { type: Date },
        most_recent_message: { type: String },
        unread_count: { type: Number }
    }],
    shopping_list:[{
        good_id:{type:Schema.ObjectId}
    }]
});

var GoodSchema = Schema({
    name: { type: String, required: true },
    userId: { type: Schema.ObjectId, required: true },
    isSold: { type: Boolean, default: false },
    tags: [{
        tag: { type: String }

    }],
    number_of_views: { type: Number, default: 0 },
    number_of_likes: { type: Number, default: 0 },
   
    description: { type: String },
    estimated_price: { type: Number }

});

var ChatSchema = Schema({
    two_user_id: [{
        id: { type: String }
    }],
    messages: [{
        content: { type: String },
        senderId: { type: String },
        chat_time: { type: Date }
    }]

})

var PostSchema = Schema({
    senderId: { type: Schema.ObjectId, required: true },
    content: { type: String, required: true },
    comments: [{
        senderId: { type: Schema.ObjectId },
        content: { type: String }
    }]
})

var TransactionSchema = Schema({
    good_id: { type: Schema.ObjectId, required: true },
    seller_id: { type: Schema.ObjectId, required: true },
    consumer_id: { type: Schema.ObjectId, required: true },
    transaction_time: { type: Date }
})

var AuthCodeSchema =new Schema({
    auth_pair: [{
        email: String,
        authcode: String
    }]
});

var AdminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})
UserModel = mongoose.model('User', UserSchema);
GoodModel = mongoose.model('Good', GoodSchema);
ChatModel = mongoose.model('Chat', ChatSchema);
PostModel = mongoose.model('Post', PostSchema);
TransactionModel = mongoose.model('Transaction', TransactionSchema);
AuthCodeModel = mongoose.model('Authcode', AuthCodeSchema);
AdminModel = mongoose.model('Admin',AdminSchema);

/**
 * DESCRIPTION: Authenticate the login of admin users 
 * PARAMETERS:
 *   - username : STRING
 *   - password : STRING
 */
verifyUser = (username,password) => new Promise((resolve, reject) => {
    AdminModel.findOne({username:username, password:password}, (err, user) => {
        if (err) reject(err);
        else if (!user) resolve(undefined);
        else {
            console.log("success!")
            resolve(user);
        };

    })
})

/**
 * DESCRIPTION: Create a user document in database 
 * PARAMETERS:
 *   - name : STRING
 *   - password : STRING
 *   - email : STRING
 *   - school : STRING
 *  ALGORITHM (IMPLEMENTATION): First check whether a user with the same email address has exitsted in the database:
 *                              if yes, reject the request; otherwise just create a corresponding document
 */
createUser = (name, password, email, school) => new Promise((resolve, reject) => {
    UserModel.findOne({ email: email }, (err, user) => {
        if (err) reject(err);
        else if (!user) {
            UserModel.create({ name: name, password: password, email: email, school: school,shopping_list:[] }, (err, result) => {
                if (err || !result) reject(err);
                else {
                    resolve(true);
                }
            });
        }
        else {
            resolve(false);
        }
    });
})

/**
 * DESCRIPTION: Given the id, find and return the document of a user
 * PARAMETERS:
 *   - uid : STRING
 */
findUser = (uid) => new Promise((resolve, reject) => {
    console.log(uid);
    UserModel.findOne({_id:uid}, (err, user) => {
        if (err) reject(err);
        else if (!user) resolve(undefined);
        else {
            resolve(user);
        };

    })
})

/**
 * DESCRIPTION: find and return the documents of all users in the database 
 */
findAllUsers = () => new Promise((resolve, reject) => {  
    UserModel.find({}, (err, user) => {
        if (err) reject(err);
        else if (!user) resolve(undefined);
        else {
            resolve(user);
        };

    })
})

/**
 * DESCRIPTION: Insert the id of a specidfic good into the shopping list of a specific user
 *              in the database
 * PARAMETERS:
 *   - user_id : STRING
 *   - good_id : STRING
 */
insertShoppingList = (user_id, good_id) => new Promise((resolve, reject) =>{
        let update = {$push:{shopping_list:{"good_id":good_id}}}
        let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        UserModel.findOneAndUpdate({ _id: user_id},update,options, (err, result) =>{
            if (err || !result) reject(err);
            else {
                resolve(true);
            }
        })
    });

 /**
 * DESCRIPTION: Delete the id of a specidfic good from the shopping list of a specific user
 *              in the database
 * PARAMETERS:
 *   - user_id : STRING
 *   - good_id : STRING
 */
deleteShoppingListItem = (user_id, good_id) => new Promise((resolve, reject) =>{
    let update = {$push:{shopping_list:{"good_id":good_id}}}
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    UserModel.updateOne({_id:user_id},{ $pull: {"shopping_list":{'good_id':good_id}}},(err, result) =>{
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
});

/**
 * DESCRIPTION: Create a document of good in the database
 * PARAMETERS:
 *   - userId : STRING
 *   - name : STRING
 *   - tags : List of STRING
 *   - number_of_views : NUMBER
 *   - number_of_likes : NUMBER
 *   - description : STRING
 *   - estimated_price : NUMBER
 */
createGood = (name, userId, tags, number_of_views, number_of_likes, description, estimated_price) => new Promise((resolve, reject) => {
    console.log(tags);
    GoodModel.create({
        name: name, userId: userId, tags: tags, number_of_views: number_of_views,
        number_of_likes: number_of_likes, description: description, estimated_price: estimated_price
    }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(result);
        }
    });
})




/**
 * DESCRIPTION: Find and return all goods documents in the database
 */
findAllGoods = () => new Promise((resolve, reject) => {

    GoodModel.find({}, (err, user) => {
        if (err) reject(err);
        else if (!user) resolve(undefined);
        else {
            resolve(user);
        };
    })
})

/**
 * DESCRIPTION: Create a message in the database
 * PARAMETERS:
 *   - ids : List of STRING
 *   - content : STRING
 *   - senderId : STRING
 *   - chat_time : DATE
 * ALGORITHM (IMPLEMENTATION): First check whether a chat document between the two ids has been created in
 *     the database: if yes, insert the content, senderId and chat_time to the message array of that document;
 *     if no, then create the corresponding chat document, and repeat the procedure above.
 */
createChatItem = (two_user_id, content, senderId, chat_time) => new Promise((resolve, reject) => {
    console.log("chat_two_user_id"+two_user_id)
    
    var ids = [{'id':two_user_id[0]['id']},{'id':two_user_id[1]['id']}]
    console.log("in database");
    console.log(content)
    console.log(senderId)
    console.log(chat_time)
    let update = {$push:{messages:{'content':content,'senderId':senderId,'chat_time': chat_time}}}
    
    ChatModel.findOne({ two_user_id: {  $all: [
        {"$elemMatch": two_user_id[0]},
        {"$elemMatch": two_user_id[1]}
      ]}}, (err, result)=>{
          if(err) reject(err);
          else if(!result){
             
             ChatModel.create({two_user_id:ids,messages:[]}, (err, result) =>{
                if (err || !result) reject(err);
                else {
                    ChatModel.update({ two_user_id: {  $all: [
                        {"$elemMatch": two_user_id[0]},
                        {"$elemMatch": two_user_id[1]}
                      ]}},update, (err, result) =>{
                        if (err || !result) reject(err);
                        else {
                            resolve(true);
                        }
                    })
                }
            })
          }
          else{
              console.log("Already exist");
            ChatModel.update({ two_user_id: {  $all: [
                {"$elemMatch": two_user_id[0]},
                {"$elemMatch": two_user_id[1]}
              ]}},update, (err, result) =>{
                if (err || !result) reject(err);
                else {
                    resolve(true);
                }
            })
           
              resolve(true);
          }
      })
})

/**
 * DESCRIPTION: Given a user id, find all chat documents where the user is involved
 * PARAMETERS:
 *   - id : STRING
 */
findSpecificChats = (id) => new Promise((resolve, reject) => {
   
    ChatModel.find({ two_user_id: {  $all: [
       
        {"$elemMatch": id}
      ]}}, (err, chat) => {
        if (err) reject(err);
        else if (!chat) resolve(undefined);
        else {
            resolve(chat);
        };
    })

})

/**
 * DESCRIPTION: Create a post document in the database
 * PARAMETERS:
 *   - senderId : STRING
 *   - content : STRING
 *   - comments : List of STRING
 */
createPost = (senderId, content, comments) => new Promise((resolve, reject) => {
    PostModel.create({ senderId: senderId, content: content, comments: comments }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})

/**
 * DESCRIPTION: Find and return all post documents in the database
*/
findAllPosts = () => new Promise((resolve, reject) => {
    PostModel.find({}, (err, post) => {
        if (err) reject(err);
        else if (!post) resolve(undefined);
        else {
            resolve(post);
        };
    })
})


/**
 * DESCRIPTION: Given a post id, insert the comment to that post document
 * PARAMETERS:
 *   - senderId : STRING
 *   - postId : STRING
 *   - content : STRING
 */
addPostComment = (postId, senderId, content) => new Promise((resolve, reject) => {
    console.log(postId);
    console.log(senderId);
    console.log(content);
    let update = {$push:{comments: {"senderId":senderId, "content":content}}}
    var newComment = {"senderId":senderId, "content":content};
    PostModel.update({_id:postId},update, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})

/**
 * DESCRIPTION: Create a transaction document which involves the seller_id, consumer_id and good_id
 * PARAMETERS:
 *   - good_id : STRING
 *   - seller_id : STRING
 *   - consumer_id : STRING
 *   - chat_time : DATE
 */
createTransaction = (good_id, seller_id, consumer_id, transaction_time) => new Promise((resolve, reject) => {
    TransactionModel.create({ good_id: good_id, seller_id: seller_id, consumer_id: consumer_id, transaction_time: transaction_time }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})

/**
 * DESCRIPTION: Find and return the transaction records of all users
 */
findSpecificTransactions = (id) => new Promise((resolve, reject) => {
        console.log("what happend")
        TransactionModel.find({},(err, transaction) => {
            if (err) reject(err);
            else if (!transaction) resolve(undefined);
            else {
                resolve(transaction);
            };
        })
})

/**
 * DESCRIPTION: Add a pair of (email,authcode) to the database
 * PARAMETERS:
 *   - email : STRING
 *   - authcode : STRING
 */
addAuthPair = (email, authcode) => new Promise((resolve, reject) => {
    AuthCodeModel.create({ auth_pair:[{email:email},{authcode:authcode}] }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})

/**
 * DESCRIPTION: Once finish authentication, delete the authcode documents in the database
 * PARAMETERS:
 *   - email : STRING
 */
deleteAuthCode = (email) => new Promise((resolve, reject) => {
    AuthCodeModel.deleteMany({"auth_pair.email":email}, (err, post) => {
        if (err) reject(err);
        else if (!post) resolve(undefined);
        else {
            resolve(post);
        };
    })
})


/**
 * Export all these functions out for the server to use
 */
module.exports = {
    UserModel: UserModel,
    GoodModel: GoodModel,
    ChatModel: ChatModel,
    PostModel: PostModel,
    TransactionModel: TransactionModel,
    AuthCodeModel: AuthCodeModel,
    AdminModel:AdminModel,
    verifyUser:verifyUser,
    createUser: createUser,
    findUser: findUser,
    findAllUsers:findAllUsers,
    insertShoppingList:insertShoppingList,
    deleteShoppingListItem:deleteShoppingListItem,
    createGood: createGood,
    findAllGoods: findAllGoods,
    createChatItem: createChatItem,
    findSpecificChats: findSpecificChats,
    createPost: createPost,
    findAllPosts: findAllPosts,
    addPostComment:addPostComment,
    createTransaction: createTransaction,
    findSpecificTransactions: findSpecificTransactions,
    addAuthPair: addAuthPair,
    deleteAuthCode: deleteAuthCode
};