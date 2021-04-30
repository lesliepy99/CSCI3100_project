/*
*MODULE ViewRank
*PROGRAMMER: WANG Ruijie
*VERSION: 1.0 (30 April 2021)
*PURPOSE: The original purpose was to give a rank based on the good comments, but we found that this idea
*         is not quite feasible, and has not much actual meaning, so we stopped the development of this
*         module. 
*         Maybe this module can be reopened some other day, after considering the cost.
*/

/**
 * Module dependencies and prototypes.
 */
import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { io } from "socket.io-client";

import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import ReactS3 from 'react-s3';
import S3 from 'react-aws-s3';

/**
 * DESCRIPTION: Set up the Material-UI styles 
 */
const useStyles = makeStyles((theme) =>({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 140,
  },
  // Styles of Background Image
  mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://picsum.photos/1000/300)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      align: 'center',
  },
  overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
  mainFeaturedPostContent: {
      align: 'center',
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
  },
  // styles of button group
  buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },


}));



/**
 * DESCRIPTION: A deserted function part, maybe useful some other day.
 *              But now it is better to remain hidden. 
 */
class ViewRank extends React.Component {
    render() {
      return (
        <div>
          <h2> My rank data </h2>
          <h3>
            {" "}
              Please try to follow community rules and stay honest while using the
              platform:{" "}
          </h3>
          <ul>
            <li>Jerry loves your CSCI1000 book</li>
            <li>Alice thinks your goods have high-quality</li>
            <li>John wants to consult about your CSCI5000 course</li>
            <li>Barbara likes the bike you post</li>
            <li>Alexander inviters you to look at his good</li>
          </ul>
          <button onClick={() => alert("Hello There!")}> Show an message</button>
        </div>
      );
    }
  }


/**
 * DESCRIPTION: mapStateToProps helps to use the current User information          
 */
  function mapStateToProps(state){
    console.log(state)
    return{
      my_id: state.my_id,
      goods: state.goods,
      posts: state.posts,
      user_info: state.user_info
    };
  }
/**
 * DESCRIPTION: export the current Module to use          
 */
  export default connect(mapStateToProps)(ViewRank);