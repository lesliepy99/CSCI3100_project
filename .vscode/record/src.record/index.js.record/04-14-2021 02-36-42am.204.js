import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { io } from "socket.io-client";
import { createStore } from 'redux'
import { Provider } from 'react-redux';



var user_info = [];
var goods = [];
var posts =[];
var my_id = null;
var transactions = [];


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
const dataStore = { user_info: user_info, goods: goods, my_id: my_id,posts:posts}
console.log(dataStore)
const reducer = (state = dataStore, action) =>  {
  
if (action.type=='update_user'){
    
  if(action.data['operationType']=="replace"){
    console.log(action.data);
   
    var index = user_info.findIndex((element) => {
      return element['email'] === action.data['fullDocument']['email'];
    })
    console.log(index)
    console.log(user_info)
    console.log("lol")
    user_info[index] = action.data['fullDocument']
  }

     else if (action.data['operationType']=="insert"){
    user_info.push(action.data['fullDocument'])
  }
    
  return  {user_info,goods,my_id,posts,transactions};
  }
  else if(action.type=="signin"){
    my_id = action.data;
    return  {user_info,goods,my_id,posts,transactions};
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
    
    return  {user_info,goods,my_id,posts,transactions};
  }

  else if(action.type=="update_post"){
    if(action.data['operationType']=="insert_comment"){
      console.log(action.data);
     
      var index = goods.findIndex((element) => {
        return element['_id'] === action.data['fullDocument']['_id'];
      })
      console.log(index)
      console.log(posts)
      console.log("lol goods")
      goods[index] = action.data['fullDocument']
    }  
    else if (action.data['operationType']=="add_post"){
      goods.push(action.data['fullDocument'])
    }
    
    return  {user_info,goods,my_id,posts,transactions};
  }

  else if(action.type=="transaction_init"){ 
    if(transactions.length==0){
        for(var i=0;i<action.data.length;i++){
          transactions.push(action.data[i]);
        }
    }
    return  {user_info,goods,my_id,posts,transactions};
  }
   
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
