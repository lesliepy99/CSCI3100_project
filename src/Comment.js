import React, { Component } from 'react';
import './App.css';



import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateIcon from '@material-ui/icons/Create';
import DraftsIcon from '@material-ui/icons/Drafts';
import TextField from '@material-ui/core/TextField';
import { NavLink, Redirect, Link} from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { io } from "socket.io-client";

import PostList from './post_components/PostList';
import { withStyles } from "@material-ui/core/styles";

import Image from './img/notebook_new.jpg'; // Import using relative path


  

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

class Main extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    return (
      <main>
        {/* return of 1st component: background image */}
        <Paper Paper style={styles.paperContainer}>
         
          <div />
          <Container maxWidth="sm">
            <div>
              <WhiteTextTypography align="center"  variant="h3"  gutterBottom={true}>{/*true 的语法，color怎么调 */}
                My Posts
              </WhiteTextTypography>
              <WhiteTextTypography align="center" variant="h5"  paragraph = {true}>
                Write down what you are looking for
              </WhiteTextTypography>
            </div>
          </Container>
        </Paper>
        <PostList/>
      </main>
    )
  }

}

{/*The language used in the textEditor is still Chinese */ }

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
        // dispatch({type:'UPDATE'});
        console.log("Update post")
      
      });
      //To check the posts
      console.log(this.props.posts);

    return (
      <div align="center">
        {/*<Button startIcon={<CreateIcon />} size="large" color="primary" >New Post</Button>*/}
        <Link
           to={{
              pathname: '/home/NewPost',
              }}
        >
           <Button color="primary" >
              New Post
           </Button>
        </Link>
        <Main/>
        {/*实验性质 */}
        
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

















