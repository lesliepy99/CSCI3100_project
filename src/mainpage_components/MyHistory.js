/*
*MODULE MyHistory
*PROGRAMMER: WANG Ruijie
*VERSION: 1.0 (30 April 2021)
*PURPOSE: Show the historical records of current user
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
 * MODEULE MyHistory
 * PURPOSE: Show the historical records of current user
 * DATA STRUCTURE: 
 *   - Variable : data - internal structure
 *   - Variable : goodData - internal structure
 *   - Variable : userData - internal structure
 *   - Variable : thisUser - internal structure
 *   - Variable : transaction_index - internal structure
 * ALGORITHM (IMPLEMENTATION) : we first do a loop to decide all the transactions that 
 *                              are related to the current User, one possiblity is that 
 *                              seller is current user, another possiblity is that buyer is
 *                              current user. Then we concatenate all the related info of 
 *                              these transactions, and we show them on screen
 */
class MyHistory extends React.Component {
    /* constructor(props){
      super(props);
    } */
    render() {
      //this.props.dispatch({type:'transaction_init',data:this.props.transactions});


/**
 * DESCRIPTION: Initialize variables
 */
      const data =      this.props.transactions;
      const goodData =  this.props.goods;
      const userData =  this.props.user_info;
      
      var thisUser = ["                *** Transaction Data ***","\n\n"]; 
      var transaction_index = 0;
      
      // console.log("transaction length is: "+ thisUser.length);
      // actually "thisUser" means this transaction. just for convenience




/**
 * DESCRIPTION: Run a loop to decide all the related transactions 
 *              and the nconcatenate them into one array, an then we can
 *              use such array to display in the module
 */
      for (var i = 0; i < data.length; i++) {

        var seller_id = data[i].seller_id;
        var consumer_id = data[i].consumer_id;
        var good_id = data[i].good_id;
        var transaction_time = data[i].transaction_time;



/**
 * DESCRIPTION: if sllerID or buyerID is same as current user ID, we can see that
 *              such a transaction is needed to be concat into our array for display
 */
        //console.log(tempID);
        if ((seller_id) == (this.props.my_id).toString() || 
                (consumer_id) == (this.props.my_id).toString()) {

          console.log("Find identical transaction_id: " + 
                data[i]._id + ". seller_id: " + seller_id + ". consumer_id: " + consumer_id);

          transaction_index ++;




/**
 * DESCRIPTION: Find the name of seller
 */
          var sellerName = "";
          for(var seller_i=0;seller_i<userData.length;seller_i++){
            var sellertempID = userData[seller_i]._id;
            //console.log(tempID);
            if ( (sellertempID)==(seller_id).toString() ){
                console.log("Find sellerName: "+userData[seller_i].name);
                sellerName = userData[seller_i].name;
                break;
            }
            else{
                continue;
            }
          }



/**
 * DESCRIPTION: Find the name of consumer / or we can call him/her a buyer
 */
          var consumerName = "";
          for(var consumer_i=0;consumer_i<userData.length;consumer_i++){
            var consumertempID = userData[consumer_i]._id;
            //console.log(tempID);
            if ( (consumertempID)==(consumer_id).toString() ){
                console.log("Find consumerName: "+userData[consumer_i].name);
                consumerName = userData[consumer_i].name;
                break;
            }
            else{
                continue;
            }
          }



/**
 * DESCRIPTION: Find the name of the sold good
 */
          var goodName = "";
          for(var good_i=0;good_i<goodData.length;good_i++){
            var goodtempID = goodData[good_i]._id;
            //console.log(tempID);
            if ( (goodtempID)==(good_id).toString() ){
                console.log("Find goodName: "+goodData[good_i].name);
                goodName = goodData[good_i].name;
                break;
            }
            else{
                continue;
            }
          }



/**
 * DESCRIPTION: Concatenate to the big array to display.
 */
          thisUser = thisUser.concat(
            "Transaction number " + transaction_index.toString() + ":  \n");
          thisUser = thisUser.concat(
            "        Good_name:                " + goodName + "\n");
          thisUser = thisUser.concat(
            "        Seller_name:                " + sellerName + "\n");
          thisUser = thisUser.concat(
            "        Consumer_name:        " + consumerName + "\n");
          thisUser = thisUser.concat(
            "        Transaction_time:    " + transaction_time.toString() + "\n");
          thisUser = thisUser.concat("\n\n");

          

/**
 * DESCRIPTION: set a log for help debug
 */
          console.log("transaction length is: "+ thisUser.length);
          console.log("transaction is: "+ thisUser);
          //break;
        }
        else {
          continue;
        }
      }



      //console.log(JSON.stringify(thisUser));
/**
 * DESCRIPTION: return the above mentioned results and the work is done
 */
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
      transactions: state.transactions,
      user_info: state.user_info,
      goods: state.goods
    };
  }
/**
 * DESCRIPTION: export the current Module to use          
 */
  export default connect(mapStateToProps)(MyHistory);