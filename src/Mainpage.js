/*
*MODULE Mainpage
*PROGRAMMER: WANG Ruijie
*VERSION: 1.0 (30 April 2021)
*PURPOSE: It is the module to display the mainpage, and the precise part to 
*         be displayed is decided in the mainpage route part 
*         (you can see at /mainpage_components/MainpageRoute.js)
*/

/**
 * Module dependencies and prototypes.
 */
import React, { Component } from 'react';
import './App.css';
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

import  getConfig from  './utils/handle_image_upload'
import ReactS3 from 'react-s3';
import S3 from 'react-aws-s3';

import UploadGood from './mainpage_components/UploadGood';
import ViewRank from './mainpage_components/ViewRank';
import PersonalInfo from './mainpage_components/PersonalInfo';
import MyHistory from './mainpage_components/MyHistory';
import MainpageRoute from './mainpage_components/MainpageRoute';

// import from utils folder
import Header from './mainpage_components/Utils/Header';

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
 * DESCRIPTION: Create Title name and Content 
 */
const title = "Personal Mainpage";
const title_content = "Check the personal information and transactions here";

/**
 * MODEULE Mainpage
 * PURPOSE: Display the mainpage skeleton, the contents are calling 
 *          MainpageRoute choice={mainPageChoice} to decide
 * DATA STRUCTURE: 
 *   - Variable : handleUploadGoodClick - internal structure
 *   - Variable : handleViewRankClick - internal structure
 *   - Variable : handlePersonalInfoClick - internal structure
 *   - Variable : handleMyHistoryClick - internal structure
 *   - Variable : handleMyChatListClick - internal structure
 *   - Variable : mainPageChoice - internal structure
 * ALGORITHM (IMPLEMENTATION) : we do a switch-case condition and then simply 
 *                              decide the part to be displayed
 */
class Mainpage extends React.Component {
/**
 * DESCRIPTION: Initialize variables
 */
  constructor(props) {
    super(props);
    this.handleUploadGoodClick = this.handleUploadGoodClick.bind(this);
    this.handleViewRankClick = this.handleViewRankClick.bind(this);
    this.handlePersonalInfoClick = this.handlePersonalInfoClick.bind(this);
    this.handleMyHistoryClick = this.handleMyHistoryClick.bind(this);
    this.handleMyChatListClick = this.handleMyChatListClick.bind(this);
    this.state = { mainPageChoice: 1 };
  }

/**
 * DESCRIPTION: If UploadGood button is clicked, we set mainPageChoice to be 1
 */
  handleUploadGoodClick() {
    this.setState((state) => {
      return { mainPageChoice: 1 };
    });
  }

/**
 * DESCRIPTION: If ViewRank button is clicked, we set mainPageChoice to be 2
 */
  handleViewRankClick() {
    this.setState((state) => {
      return { mainPageChoice: 2 };
    });
  }

/**
 * DESCRIPTION: If PersonalInfo button is clicked, we set mainPageChoice to be 3
 */
  handlePersonalInfoClick() {
    this.setState((state) => {
      return { mainPageChoice: 3 };
    });
  }

/**
 * DESCRIPTION: If MyHistory button is clicked, we set mainPageChoice to be 4
 */
  handleMyHistoryClick() {
    this.setState((state) => {
      return { mainPageChoice: 4 };
    });
  }

/**
 * DESCRIPTION: If MyChatList button is clicked, we set mainPageChoice to be 5
 */
  handleMyChatListClick() {
    this.setState((state) => {
      return { mainPageChoice: 5 };
    });
  }
  

  render() {
/**
 * DESCRIPTION: Initialize variable
 */
    const mainPageChoice = this.state.mainPageChoice;

    /* const classes = useStyles(); */
/**
 * DESCRIPTION: the main part to be displayed. We show four buttons, and clicking
 *              each of them will change the mainPageChoice and therefore refresh
 *              this mianpage to show the correspoding contents.
 */
    return (
      <main>
        <Header title={title} content={title_content} />
        {/* <h1>Personal Mainpage of {this.props.name}</h1> */}

      <div className="body" align="center">
        <ButtonGroup variant="contained" size="large" color="primary" aria-label="contained primary button group">
          <Button onClick={this.handleUploadGoodClick}>Upload Good</Button>
          {/* <Button onClick={this.handleViewRankClick}>View My Rank</Button> */}
          <Button onClick={this.handlePersonalInfoClick}>Personal Info</Button>
          <Button onClick={this.handleMyHistoryClick}>My History</Button>
          <Button onClick={this.handleMyChatListClick}>My Chat List</Button>
        </ButtonGroup>
        </div>

        <Container maxWidth="md" /* style={{ backgroundColor: '#e3f2fd' }} */>
          <  MainpageRoute choice={mainPageChoice}  />
        </Container>
      
      </main>
    );
  }
}


// ========================================

//ReactDOM.render(<Mainpage name="Jack" />, document.getElementById("root"));

// the place to store all the possible mapProp querys

/* 
function mapStateToProps(state){
  console.log(state)
  return{
    my_id: state.my_id,
    goods: state.goods,
    posts: state.posts,
    user_info: state.user_info
  };
}
export default connect(mapStateToProps)(Mainpage);
 */


/**
 * DESCRIPTION: export the current Module to use          
 */
export default Mainpage;