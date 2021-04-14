import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { io } from "socket.io-client";
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { CompareArrowsOutlined } from '@material-ui/icons';



var user_info = [];
var goods = [];
var posts =[];
var my_id = null;
var transactions = [];
var my_chats = [];

   fetch('http://localhost:3000/find_all_users',)
  .then(async res => {
    
    const data = await res.json();
    for(var i=0;i<data.length;i++){
      user_info.push(data[i]);
    }
  
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));



   fetch('http://localhost:3000/find_all_goods')
    .then(async response => {
      const data = await response.json();
      for (var i = 0; i < data.length; i++) {
        goods.push(data[i]);
      }

    })
    .catch(error => {

    console.error('There was an error!', error);
    });



   fetch('http://localhost:3000/find_all_posts')
  .then(async response => {
    const data = await response.json();
    for(var i=0;i<data.length;i++){
      posts.push(data[i]);
    }

  })
  .catch(error => {

    console.error('There was an error!', error);
  });

console.log(goods);
console.log(user_info);
// console.log(goods);
const dataStore = { user_info: user_info, goods: goods, my_id: my_id,posts:posts,my_chats:my_chats}
console.log(dataStore)
const reducer = (state = dataStore, action) =>  {
  
if (action.type=='update_user'){
    console.log("Watch the change")
    console.log(action.data)
  if(action.data['operationType']=="replace" ){
    console.log(action.data);
    console.log("Can you see?")
    var index = user_info.findIndex((element) => {
      return element['email'] === action.data['fullDocument']['email'];
    })
    console.log(index)
    console.log(user_info)
    console.log("lol")
    user_info[index] = action.data['fullDocument']
  }

     else if (action.data['operationType']=="insert"){
      if(!user_info.some(item => action.data['fullDocument']._id == item._id)){
        user_info.push(action.data['fullDocument'])
      }   
  }

  else if (action.data['operationType']=="update"){
   console.log("Helllllllllllllllllllllllllllllll")
    fetch('http://localhost:3000/find_all_users',)
  .then(async res => {
    
    const data = await res.json();
    user_info = [];
    for(var i=0;i<data.length;i++){
      user_info.push(data[i]);
    }
    console.log(user_info)
    console.log(
      "Where to return"
    )
    return  {user_info,goods,my_id,posts,transactions,my_chats};
  })
  
    
}
  console.log(
    "before return"
  )
  return  {user_info,goods,my_id,posts,transactions,my_chats};
  }
  else if(action.type=="signin"){
    my_id = action.data;
    return  {user_info,goods,my_id,posts,transactions,my_chats};
  }
  else if(action.type=="update_good"){
    if(action.data['operationType']=="replace"){
      console.log(action.data);
      
      var index = goods.findIndex((element) => {
        return element['_id'] === action.data['fullDocument']['_id'];
      })
      console.log(index)
      console.log(goods)
      console.log("lol goods")
      goods[index] = action.data['fullDocument']
    }  
    else if (action.data['operationType']=="insert"){
      if(!goods.some(item => action.data['fullDocument']._id == item._id)){
        goods.push(action.data['fullDocument']);
      }
    }
    
    return  {user_info,goods,my_id,posts,transactions,my_chats};
  }

  else if(action.type=="update_post"){
    if(action.data['operationType']=="update"){
      console.log(action.data);
     
      var index = goods.findIndex((element) => {
        return element['_id'] === action.data['fullDocument']['_id'];
      })
      console.log(index)
      console.log(posts)
      console.log("lol goods")
      goods[index] = action.data['fullDocument']
    }  
    else if (action.data['operationType']=="insert"){
      if(!posts.some(item => action.data['fullDocument']._id == item._id)){
        posts.push(action.data['fullDocument'])
      }
      
    }   
    return  {user_info,goods,my_id,posts,transactions,my_chats};
  }

  else if(action.type=="transaction_init"){ 
    if(transactions.length==0){
        for(var i=0;i<action.data.length;i++){
          transactions.push(action.data[i]);
        }
    }
    return  {user_info,goods,my_id,posts,transactions,my_chats};
  }
  else if(action.type=="add_transaction"){ 
    if(!transactions.some(item => action.data['fullDocument']._id == item._id)){
      transactions.push(action.data['fullDocument'])
    }
    return  {user_info,goods,my_id,posts,transactions,my_chats};
  }

  else if(action.type=="chat_init"){ 
    if(my_chats.length==0){
        for(var i=0;i<action.data.length;i++){
          my_chats.push(action.data[i]);
        }
    }
    return  {user_info,goods,my_id,posts,transactions,my_chats};
  }
  else if(action.type=="addChat"){ 
    // console.log("wuxiang debug at index.js:",action.data['updateDescription']['updatedFields']);
    console.log(action.data)
     
    if(action.data['fullDocument']!=undefined){
      console.log("Not exist")
      if(!my_chats.some(item =>item._id==action.data['fullDocument']['_id'])){
        my_chats.push(action.data['fullDocument'])
      }
      return  {user_info,goods,my_id,posts,transactions,my_chats};
    }
    else{
    for(var i=0;i<1000;i++){
      var index = "messages."+i
      if(action.data['updateDescription']['updatedFields'][index]!=undefined){
         console.log("Found it!")
         var specificChatIndex = my_chats.findIndex(item => action.data['documentKey']['_id'].toString() == item._id.toString());
         console.log(specificChatIndex)
         if(!my_chats[specificChatIndex]["messages"].some(item => item._id.toString()==action.data['updateDescription']['updatedFields'][index]["_id"])){
         my_chats[specificChatIndex]["messages"].push(action.data['updateDescription']['updatedFields'][index])}
         console.log(my_chats[specificChatIndex]["messages"])
       
         console.log(action.data['updateDescription']['updatedFields'][index])
         break
      }
      
    }}
    

    console.log("Ready to return-------------------------")


    return  {user_info,goods,my_id,posts,transactions,my_chats};
  }
  // else if(action.type=="shopping_list_init"){ 
  //   if(shoppingList.length==0){
  //       for(var i=0;i<action.data.length;i++){
  //         transactions.push(action.data[i]);
  //       }
  //   }
  //   return  {user_info,goods,my_id,posts,transactions,my_chats};
  // }
   
  else{

    return state;}
  
}

const store = createStore(reducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
