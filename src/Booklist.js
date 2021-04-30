import React, { Component } from 'react';
import { useState, useEffect } from 'react';
// import {Container,Col,Row} from 'react-bootstrap';

import './App.css';
import books from './books.json';

import { connect } from 'react-redux';
import { io } from "socket.io-client";

import Header from './booklist_components/Header';
import Display from './booklist_components/Display';
import Bar from './booklist_components/Bar';


const products = [
  {
      _id: 1,
      name: 'Running Shoes',
      estimated_price: 68,
      image: 'https://source.unsplash.com/featured/?shoes',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Food, Drink, Cooking Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "New Territories"
      }],
  },
  {
      _id: 2,
      name: 'Umbrella',
      estimated_price: 5,
      image: 'https://source.unsplash.com/featured/?umbrella',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Food, Drink, Cooking Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "New Territories"
      }],
  }, {
      _id: 3,
      name: 'Book - The Little Women',
      estimated_price: 20,
      image: 'https://source.unsplash.com/featured/?girl',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Food, Drink, Cooking Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "Hong Kong Island"
      }],
  }, {
      _id: 4,
      name: 'iPhone4s',
      estimated_price: 130,
      image: 'https://source.unsplash.com/featured/?iPhone4s',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Food, Drink, Cooking Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "Hong Kong Island"
      }],
  }, {
      _id: 5,
      name: 'iPad mini',
      estimated_price: 100,
      image: 'https://source.unsplash.com/featured/?ipad',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "FClothes, Bags"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "New Territories"
      }],
  }, {
      _id: 6,
      name: 'Camera',
      estimated_price: 999,
      image: 'https://source.unsplash.com/featured/?camera',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Book, Teaching Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "Kowloon"
      }],
  }, {
      _id: 7,
      name: 'T-shirt',
      estimated_price: 10,
      image: 'https://source.unsplash.com/featured/?shirts',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Book, Teaching Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "Kowloon"
      }],
  }, {
      _id: 8,
      name: 'Sunglasses',
      estimated_price: 7,
      image: 'https://source.unsplash.com/featured/?sunglasses',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Food, Drink, Cooking Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "New Territories"
      }],
  }, {
      _id: 9,
      name: 'Book - Forest',
      estimated_price: 25,
      image: 'https://source.unsplash.com/featured/?forest',
      tags: [{
          "_id": {
              "$oid": "60772bb367ba2210bc728e82"
          },
          "tag": "Food, Drink, Cooking Materials"
      }, {
          "_id": {
              "$oid": "60772bb367ba2210bc728e83"
          },
          "tag": "Kowloon"
      }],
  },
]

const carts = [
  {
    id: 1,
    title: 'Running Shoes',
    price: '$68',
    image: 'https://source.unsplash.com/featured/?shoes'
  },
  {
    id: 2,
    title: 'Umbrella',
    price: '$5',
    image: 'https://source.unsplash.com/featured/?umbrella'
  }, {
    id: 3,
    title: 'Book - The Little Women',
    price: '$20',
    image: 'https://source.unsplash.com/featured/?girl'
  },
]

// For Header
const title = "UTransformer";
const content = "View our newest collections & most popular products";

const catagory = "Recomendation";


class Booklist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var socket = io.connect();
    socket.on('userChange', data => {
      console.log(data);
      console.log("Is that right?");

      this.props.dispatch({ type: 'update_user', data: data })
      // dispatch({type:'UPDATE'});
      console.log("Update user")

    });

    socket.on('goodChange', data => {
      console.log(data);
      console.log("Is that right?");

      this.props.dispatch({ type: 'update_good', data: data })
      // dispatch({type:'UPDATE'});

    });

    // filter my info
    let filter_info = this.props.user_info.filter(info => {
      //return country.name.toLowerCase().includes(inputs.toLowerCase())
      if(info._id == this.props.my_id){
        return info;
      }
    })

    let my_info = filter_info[0];


    // filter unsold goods
    let allGood = this.props.goods;

    let filtered = allGood.filter(good => {
      //return country.name.toLowerCase().includes(inputs.toLowerCase())
      if(!good.isSold){
        return good;
      }
    })

    allGood = filtered;


    // filter rec goods
    allGood.sort(function(a, b){
      return (b.number_of_likes-a.number_of_likes)
    });

    let recGood = allGood.slice(0,27);

    return (
      <main>
        {/* Tool bar */}
        <Bar  />

        <Header title={title} content={content} />

        {/* Display product cards */}
        <Display catagory={catagory} products={recGood} myId={this.props.my_id} allUser={this.props.user_info}/>

      </main>
    );
  }
}
function mapStateToProps(state) {
  console.log(state)
  return {
    goods: state.goods,
    user_info: state.user_info,
    my_id: state.my_id,
  };
}
export default connect(mapStateToProps)(Booklist);
