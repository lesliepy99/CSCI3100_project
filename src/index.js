import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { io } from "socket.io-client";
import { createStore } from 'redux'
import { Provider } from 'react-redux';

console.log("Very good");


var user_info = [];
var goods = [];
var posts =[];
var my_id = null;

fetch('http://localhost:3000/find_user', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      email: "1155124573@link.cuhk.edu.hk",     
  })
})
.then(async res => {
  const data = await res.json();
  user_info.push(data);
  console.log("lalalalal"+data)
  console.log(data.name)
})
.then(data => console.log(data))
.catch(err => console.log(err));



fetch('http://localhost:3000/find_all_goods')
  .then(async response => {
    const data = await response.json();
    goods.push(data);

  })
  .catch(error => {

    console.error('There was an error!', error);
  });
const dataStore = { user_info: user_info, goods: goods, my_id: my_id}
const reducer = (state = dataStore, action) =>  {
  
if (action.type=='TEST'){
   
    console.log(action.data);
    
    var index = user_info.findIndex((element) => {
      return element['email'] === action.data['email'];
    })
    console.log(index)
    console.log(user_info)
    console.log("lol")
    user_info[0] = action.data
    return {user_info};
  }
  else if(action.type=="signin"){
    my_id = action.data['id'];
    return my_id;
  }
  else if(action.type=="update_good"){

  }
   else{
    console.log("Are we else?"); 
    return state;}
  
}
var socket = io.connect();
socket.on('userChange', data => {
  console.log(data);
  console.log("Is that right?");
  reducer(dataStore,'TEST');
  // dispatch({type:'UPDATE'});

});
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
