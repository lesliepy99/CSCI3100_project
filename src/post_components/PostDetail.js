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
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateIcon from '@material-ui/icons/Create';
import DraftsIcon from '@material-ui/icons/Drafts';
import TextField from '@material-ui/core/TextField';
import {Route, NavLink, Switch, Redirect, Link} from 'react-router-dom';

import CommentContent from './CommentContent';
import { connect } from 'react-redux';
import { io } from "socket.io-client";


class PostDetail extends React.Component  {
    constructor(props) {
        super(props);
      }
    render(){
       var blogs = this.props.posts; 

        return (
            
            <div>
            
            <h1>This is the PostDetail Page!!</h1>
            {/* <PostContent/> */}
            
            {/* <CommentContent/> */}

            {/* Haven't done the comment part */}
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