/*
* MODULE Forum
* PROGRAMMER: XU Haoran
* VERSION: 1.0 (30 April 2021)
* PURPOSE: Provide the forum interface. 
*/

import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import {  Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { io } from "socket.io-client";
import PostList from './post_components/PostList';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Image from './img/notebook_new.jpg'; 


  
//A list of blogs for testing purpose
const blogs = [
  {
    title: 'Books',
    content: 'Looking for any science fictions!',
  },
  {
    title: 'Computer',
    content: 'Anyone on campus has laptops on sale?',
  }, {
    title: 'Basketball',
    content: 'Need a basketball to replace mine! Contact me if you got any!',
  }, {
    title: 'Charger',
    content: 'Badly in need of a charger for my phone and I do not care about the price!',
  }, {
    title: ' High-quality Earphone',
    content: 'Got addicted to rock music recently and need a high-quality earphone!',
  }, {
    title: 'Interesting Shoes',
    content: 'Looking for some interesting shoes!',
  },
]

//Set css styles for forum page
const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`
  }
};
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

// Main component contains the header section and the post lists section imported from PostList.js of the forum page. 
class Main extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    return (
      <main>
        <Paper Paper style={styles.paperContainer}>
         
          <div />
          <Box p={3} mb={2}>
          <Container maxWidth="sm">
            <div>
            <Box p={1}>
              <WhiteTextTypography align="center"  variant="h3"  gutterBottom={true}>
                Post Area
              </WhiteTextTypography>
              </Box>
              
              <Box p={1}>
              <WhiteTextTypography align="center" variant="h5"  paragraph = {true}>
                Share you thoughts with others
              </WhiteTextTypography>
              </Box>
              
            </div>
          </Container>
          </Box>
        </Paper>
        <PostList/>
      </main>
    )
  }

}

/**
* Comment component contains the button for creating new post.
* On click the button in this component, users will be redirected to New Post page.
*/
class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var socket = io.connect();
      socket.on('postChange', data => {
        console.log(data);
        console.log("Is that right?");
        
        this.props.dispatch({type:'update_post',data:data['fullDocument']})
        console.log("Update post")
      
      });
      //To check the posts
      console.log(this.props.posts);

    return (
      <div align="center">
        <Box m={2}>
        <Link
           to={{
              pathname: '/home/NewPost',
              }}
        >
           <Button 
            variant="contained"
            startIcon={<CreateIcon />}
            color="primary" >
              New Post
           </Button>
        </Link>
        </Box>
        <Main/>
        
      </div>

    );
  }
}

function mapStateToProps(state){
  console.log(state)
  return{
    posts:state.posts
  };
}


export default connect(mapStateToProps)(Comment);

















