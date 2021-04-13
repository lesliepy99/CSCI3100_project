

const { Email } = require('@material-ui/icons');
const mongoose = require('mongoose');
var dbUri = "mongodb+srv://csci3100_project_team:csci3100project@cluster0.muf9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

var ObjectId = require('mongoose').Types.ObjectId; 
var Schema = mongoose.Schema;
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection:error:'));

db.once('open', function () {
    console.log("Mongodb connected!");
})

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
        senderId: { type: Schema.ObjectId },
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
UserModel = mongoose.model('User', UserSchema);
GoodModel = mongoose.model('Good', GoodSchema);
ChatModel = mongoose.model('Chat', ChatSchema);
PostModel = mongoose.model('Post', PostSchema);
TransactionModel = mongoose.model('Transaction', TransactionSchema);
AuthCodeModel = mongoose.model('Authcode', AuthCodeSchema);

createUser = (name, password, email, school,year) => new Promise((resolve, reject) => {
    UserModel.findOne({ email: email }, (err, user) => {
        if (err) reject(err);
        else if (!user) {
            UserModel.create({ name: name, password: password, email: email, school: school,shopping_list:{} }, (err, result) => {
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

findAllUsers = () => new Promise((resolve, reject) => {
    
    UserModel.find({}, (err, user) => {
        if (err) reject(err);
        else if (!user) resolve(undefined);
        else {
            resolve(user);
        };

    })
})

insertShoppingList = (user_id, good_id) => new Promise((resolve, reject) =>{
        let update = {$push:{shopping_list:good_id}}
        let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        ChatModel.findOneAndUpdate({ _id: user_id},update,options, (err, result) =>{
            if (err || !result) reject(err);
            else {
                resolve(true);
            }
        })
    });


createGood = (name, userId, tags, number_of_views, number_of_likes, description, estimated_price) => new Promise((resolve, reject) => {
   
    GoodModel.create({
        name: name, userId: userId, tags: tags, number_of_views: number_of_views,
        number_of_likes: number_of_likes, description: description, estimated_price: estimated_price
    }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})





findAllGoods = () => new Promise((resolve, reject) => {

    GoodModel.find({}, (err, user) => {
        if (err) reject(err);
        else if (!user) resolve(undefined);
        else {
            resolve(user);
        };
    })
})

createChatItem = (two_user_id, new_message) => new Promise((resolve, reject) => {
    let update = {$push:{messages:new_message}}
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    ChatModel.findOneAndUpdate({ two_user_id: { $all: [two_user_id[0], two_user_id[1]]}},update,options, (err, result) =>{
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    })

    // ChatrModel.create({ two_user_id: two_user_id, messages: {} }, (err, result) => {
    //     if (err || !result) reject(err);
    //     else {
    //         resolve(true);
    //     }
    // });
})

findSpecificChats = (two_user_id) => new Promise((resolve, reject) => {

    ChatModel.find({ two_user_id: { $all: [two_user_id[0], two_user_id[1]] } }, (err, chat) => {
        if (err) reject(err);
        else if (!chat) resolve(undefined);
        else {
            resolve(chat);
        };
    })

})

createPost = (senderId, content, comments) => new Promise((resolve, reject) => {
    PostModel.create({ senderId: senderId, content: content, comments: comments }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})

findAllPosts = () => new Promise((resolve, reject) => {

    PostModel.find({}, (err, post) => {
        if (err) reject(err);
        else if (!post) resolve(undefined);
        else {
            resolve(post);
        };
    })
})

addPostComment = (postId, senderId, content) => new Promise((resolve, reject) => {
    var newComment = {"senderId":senderId, "content":content};
    PostModel.update({_id:postId},{$push:{comments:newComment}}, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})


createTransaction = (good_id, seller_id, consumer_id, transaction_time) => new Promise((resolve, reject) => {
    TransactionModel.create({ good_id: good_id, seller_id: seller_id, consumer_id: consumer_id, transaction_time: transaction_time }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})


findSpecificTransactions = (id) => new Promise((resolve, reject) => {
    // if (type == "seller") {
    //     TransactionModel.find({ seller_id: id }, (err, transaction) => {
    //         if (err) reject(err);
    //         else if (!transaction) resolve(undefined);
    //         else {
    //             resolve(transaction);
    //         };
    //     })
    // }
    // else if (type == "consumer") {
        console.log("what happend")
        TransactionModel.find({},(err, transaction) => {
            if (err) reject(err);
            else if (!transaction) resolve(undefined);
            else {
                resolve(transaction);
            };
        })
       
    // }


})

addAuthPair = (email, authcode) => new Promise((resolve, reject) => {
    AuthCodeModel.create({ auth_pair:[{email:email},{authcode:authcode}] }, (err, result) => {
        if (err || !result) reject(err);
        else {
            resolve(true);
        }
    });
})

deleteAuthCode = (email) => new Promise((resolve, reject) => {

    AuthCodeModel.deleteMany({"auth_pair.email":email}, (err, post) => {
        if (err) reject(err);
        else if (!post) resolve(undefined);
        else {
            resolve(post);
        };
    })
})


module.exports = {
    UserModel: UserModel,
    GoodModel: GoodModel,
    ChatModel: ChatModel,
    PostModel: PostModel,
    TransactionModel: TransactionModel,
    AuthCodeModel: AuthCodeModel,
    createUser: createUser,
    findUser: findUser,
    findAllUsers:findAllUsers,
    insertShoppingList:insertShoppingList,
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