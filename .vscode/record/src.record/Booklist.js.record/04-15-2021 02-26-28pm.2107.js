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
  }, {
    id: 4,
    title: 'iPhone4s',
    price: '$130',
    image: 'https://source.unsplash.com/featured/?iPhone4s'
  }, {
    id: 5,
    title: 'iPad mini',
    price: '$100',
    image: 'https://source.unsplash.com/featured/?ipad'
  }, {
    id: 6,
    title: 'Camera',
    price: '$999',
    image: 'https://source.unsplash.com/featured/?camera'
  }, {
    id: 7,
    title: 'T-shirt',
    price: '$10',
    image: 'https://source.unsplash.com/featured/?shirts'
  }, {
    id: 8,
    title: 'Sunglasses',
    price: '$7',
    image: 'https://source.unsplash.com/featured/?sunglasses'
  }, {
    id: 9,
    title: 'Book - Forest',
    price: '$25',
    image: 'https://source.unsplash.com/featured/?forest'
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

    let recGood = allGood.slice(0,18);

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
