import React, { Component } from 'react';
// import {Container,Col,Row} from 'react-bootstrap';

import './App.css';
import books from './books.json';

import { connect } from 'react-redux';
import { io } from "socket.io-client";

import Header from './Header';
import Display from './Display';
import Bar from './Bar';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    title: 'Running Shoes',
    price: '$68',
    image: 'https://source.unsplash.com/featured/?shoes'
  },
  {
    title: 'Umbrella',
    price: '$5',
    image: 'https://source.unsplash.com/featured/?umbrella'
  }, {
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
    socket.on('goodChange', data => {
      console.log(data);
      console.log("Is that right?");

      this.props.dispatch({ type: 'update_good', data: data['fullDocument'] })
      // dispatch({type:'UPDATE'});

    });

    console.log(this.props.goods);
    console.log("Lok at here");

    return (
      <main>
        {/* Tool bar */}
        <Bar carts={carts} />

        <Header title={title} content={content} />

        {/* Display product cards */}
        <Display catagory={catagory} products={products} />

      </main>
    );
  }
}
function mapStateToProps(state) {
  return {
    goods: state.goods
  };
}
export default connect(mapStateToProps)(Booklist);
