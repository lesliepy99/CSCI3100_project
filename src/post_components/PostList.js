import React, { Component } from 'react';
import '../App.css';

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
import {Route, NavLink, Switch, Redirect, Link, BrowserRouter} from 'react-router-dom';

import PostDetail from './PostDetail'
import { connect } from 'react-redux';
import { io } from "socket.io-client";




class PostList extends React.Component {


  constructor(props) {
    super(props);
  }
    render(){
      
    var blogs = this.props.posts;
    
      return (
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {blogs.map((blogs) => (
              <Grid item key={blogs} xs={12} sm={12} md={12}>
                <Card >
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                      {blogs.senderId} {/* 需改成title */}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {blogs.content}
                    </Typography>
                  </CardContent>
                  <CardActions >               
                    <Link
                        to={{
                            pathname: '/home/PostDetail',
                        }}
                    >
                        <Button color="primary" >
                             Read Detail
                        </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
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

  export default connect(mapStateToProps)(PostList);