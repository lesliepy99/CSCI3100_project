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
var my_id = '12';
fetch('http://localhost:3000/find_user')
  .then(async response => {
    const data = await response.json();
    user_info.push(data['name']);

  })
  .catch(error => {

    console.error('There was an error!', error);
  });

fetch('http://localhost:3000/find_all_goods')
  .then(async response => {
    const data = await response.json();
    goods.push(data);

  })
  .catch(error => {

    console.error('There was an error!', error);
  });
const dataStore = { user_info: user_info, goods: goods, my_id:my_id}
const reducer = (state = dataStore, action) =>  {
  
if (action.type=='TEST'){
   
    console.log(action.data);
     return {user_info:[action.data['name']]};
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
