/*
*Post List MODULE
*PROGRAMMER: XU Haoran
*VERSION: 1.0 (30 April 2021)
*PURPOSE: Show all the posts in a list.
*/

import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Route, NavLink, Switch, Redirect, Link, BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';




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
                    <Typography variant="body3" component="p" align="left">
                      {blogs.content}
                    </Typography>
                  </CardContent>
                  <CardActions >
                    {/*Different URLs will lead to different posts */}               
                    <Link
                        to={{
                            pathname: `/home/PostDetail/${blogs._id}`,
                            state:{content:blogs.content}
                        }}
                    >
                        <Button 
                          color="primary"
                          variant="contained"
                         >
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