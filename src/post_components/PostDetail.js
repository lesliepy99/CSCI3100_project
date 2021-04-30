/*
*Post Detail MODULE
*PROGRAMMER: XU Haoran
*VERSION: 1.0 (30 April 2021)
*PURPOSE: Show the detailed information of each post in this Post Detail page.
*/

import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class PostDetail extends React.Component  {
    constructor(props) {
        super(props);
        this.state={ content: this.props.location.state.content,            
        }
      }
    render(){
        var Content = this.state.content;
        {/* Navigate based on the unique post id of each post */} 
        const { id } = this.props.match.params;
        console.log(Content);

        return (
            
            <div>
            
            <h1>{Content}</h1>
            {/* <PostContent/> */}            
            {/* <CommentContent/> */}
            </div>
    
        )
    }
    
}

function mapStateToProps(state) {
    console.log(state)
    return {
    my_id: state.my_id,
    posts: state.posts,
    };
  }

  export default connect(mapStateToProps)(PostDetail);