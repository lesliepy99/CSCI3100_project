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
      var thisUser = ["                *** Transaction Data ***","\n\n"]; 
      var transaction_index = 0;
      // console.log("transaction length is: "+ thisUser.length);
      // actually "thisUser" means this transaction. just for convenience

      for (var i = 0; i < data.length; i++) {

        var seller_id = data[i].seller_id;
        var consumer_id = data[i].consumer_id;
        var good_id = data[i].good_id;
        var transaction_time = data[i].transaction_time;

        //console.log(tempID);
        if ((seller_id) == (this.props.my_id).toString() || 
                (consumer_id) == (this.props.my_id).toString()) {

          console.log("Find identical transaction_id: " + 
                data[i]._id + ". seller_id: " + seller_id + ". consumer_id: " + consumer_id);

          transaction_index ++;


          thisUser = thisUser.concat(
            "Transaction number " + transaction_index.toString() + ":  \n");
          thisUser = thisUser.concat(
            "        Good_id:                " + good_id.toString() + "\n");
          thisUser = thisUser.concat(
            "        Seller_id:               " + seller_id.toString() + "\n");
          thisUser = thisUser.concat(
            "        Consumer_id:          " + consumer_id.toString() + "\n");
          thisUser = thisUser.concat(
            "        Transaction_time:    " + transaction_time.toString() + "\n");
          thisUser = thisUser.concat("\n\n");


          console.log("transaction length is: "+ thisUser.length);
          console.log("transaction is: "+ thisUser);
          //break;
        }
        else {
          continue;
        }
      }



      //console.log(JSON.stringify(thisUser));
      return (
        <div style={{whiteSpace: 'pre-wrap', padding: "5% 5% 15% 15%"  }}>
          <h2> Transaction history </h2>
          <h3>
            {" "}
              Find all your previous transactions here{" "}
          </h3>
          {/* <ul>
            {
              //JSON.stringify(thisUser)
              thisUser.map(txt => <li>{txt}</li>)
              //thisUser
            }
          </ul> */}
          {thisUser}
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