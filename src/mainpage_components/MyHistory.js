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




class MyHistory extends React.Component {
    render() {
      const data = this.props.transactions;
      var thisUser = []; 
      // actually "thisUser" means this transaction. just for convenience

      for (var i = 0; i < data.length; i++) {
        var seller_id = data[i].seller_id;
        var consumer_id = data[i].consumer_id;
        //console.log(tempID);
        if ((seller_id) == (this.props.my_id).toString() || 
                (consumer_id) == (this.props.my_id).toString()) {

          console.log("Find identical transaction_id: " + 
                data[i]._id + ". seller_id: " + seller_id + ". consumer_id: " + consumer_id);
          thisUser = [].push(data[i]);
          console.log("transaction is: "+data[i]);
          //break;
        }
        else {
          continue;
        }
      }



      console.log(thisUser);
      return (
        <div>
          <h2> Your history of selling/purchasing </h2>
          <h3>
            {" "}
              Look what you have obtained and how you maximize the use of resources:{" "}
          </h3>
          <ul>
            <li>{thisUser}</li>
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
      transactions: state.transactions,
      user_info: state.user_info
    };
  }
  export default connect(mapStateToProps)(MyHistory);