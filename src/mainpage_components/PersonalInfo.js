/*
*MODULE PersonalInfo
*PROGRAMMER: WANG Ruijie
*VERSION: 1.0 (30 April 2021)
*PURPOSE: Show the personal information of the current user.
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
 * MODEULE PersonalInfo
 * PURPOSE: Show the personal info of the current user
 * DATA STRUCTURE: 
 *   - Variable : data - internal structure
 *   - Variable : thisUser - internal structure
 * ALGORITHM (IMPLEMENTATION) : firstly run a loop to decide the current user identity, and then
 *                              we can list all the available personal info on the screen
 */
class PersonalInfo extends React.Component {
    render() {

/**
 * DESCRIPTION: Initialize variables
 */
        const data = this.props.user_info;
        var thisUser;


/**
 * DESCRIPTION: Initialize variables
 */
        for(var i=0;i<data.length;i++){
            var tempID = data[i]._id;
            //console.log(tempID);
            if ( (tempID)==(this.props.my_id).toString() ){
                console.log("Find identical user_id: "+data[i]._id);
                thisUser = data[i];
                break;
            }
            else{
                thisUser = null
            }
          }


          
/**
 * DESCRIPTION: Log in consle for help debug
 */
          console.log(thisUser);
/**
 * DESCRIPTION: Show all the personal info in a clear way
 */
      return (
        <div style={{ whiteSpace: 'pre-wrap', padding: "5% 5% 15% 15%" }}>
          <h2> My personal information </h2>
          <h3> I'm feeling good Today :D </h3>
          <ul>
            <li>Name:                {thisUser.name}</li>
            <li>University:          {thisUser.school}</li>
            <li>Location:            Hong Kong (*By default)</li>
            <li>Education:          University (*By default)</li>
            <li>email:                 {thisUser.email}</li>
          </ul> 
          {/* <button onClick={() => alert("Hello There!")}>Show an message</button> */}
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
      user_info: state.user_info
    };
  }
/**
 * DESCRIPTION: export the current Module to use          
 */
  export default connect(mapStateToProps)(PersonalInfo);