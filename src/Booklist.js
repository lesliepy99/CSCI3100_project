/*
* MODULE StorePage
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: Provide basic store interface. 
*/

/**
 * Module dependencies and prototypes.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { io } from "socket.io-client";

import Header from './booklist_components/Header';
import Display from './booklist_components/Display';
import Bar from './booklist_components/Bar';
import './App.css';


// Define contents to be deisplayed in Header
const title = "UTransformer";
const content = "View our newest collections & most popular products";
const catagory = "Recomendation";

/**
 * MODEULE StorePage
 * DATA STRUCTURE: 
 *   - Method: filter goods - internal structure
 * ALGORITHM (IMPLEMENTATION) : Acquire goods data from database.
 *                              Filter unsold goods and sort them according to number of likes.
 *                              Select top 27 recommended goods and display.
 */
class Booklist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // acquire goods and user data
    var socket = io.connect();
    socket.on('userChange', data => {
      this.props.dispatch({ type: 'update_user', data: data })
    });

    socket.on('goodChange', data => {
      this.props.dispatch({ type: 'update_good', data: data })
    });

    // filter unsold goods
    let allGood = this.props.goods;

    let filtered = allGood.filter(good => {
      if(!good.isSold){
        return good;
      }
    })

    allGood = filtered;

    // filter recommendation goods
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
