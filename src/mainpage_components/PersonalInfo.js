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





class PersonalInfo extends React.Component {
    render() {
        const data = this.props.user_info;
        var thisUser;

        for(var i=0;i<data.length;i++){
            var tempID = data[i]._id;
            console.log(tempID);
            if ( (tempID)==(this.props.my_id).toString() ){
                console.log("Find identical user_id: "+data[i]._id);
                thisUser = data[i];
                break;
            }
            else{
                thisUser = null
            }
          }
          
          console.log(thisUser);
      return (
        <div>
          <h2> I'm feeling good Today </h2>
          <h3> My detailed personal information: </h3>
          <ul>
            {/* email:
                name: 
                school:  */}
            <li>Name:        {thisUser.name}</li>
            <li>email:        {thisUser.email}</li>
            <li>University:        {thisUser.school}</li>
            <li>Location:        Hong Kong</li>
            <li>Education Level:        University</li>
          </ul>
          <button onClick={() => alert("Hello There!")}>Show an message</button>
        </div>
      );
    }
  }



  function mapStateToProps(state){
    console.log(state)
    return{
      my_id: state.my_id,
      user_info: state.user_info
    };
  }
  export default connect(mapStateToProps)(PersonalInfo);