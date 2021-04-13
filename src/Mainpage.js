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





class Mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.handleUploadGoodClick = this.handleUploadGoodClick.bind(this);
    this.handleViewRankClick = this.handleViewRankClick.bind(this);
    this.handlePersonalInfoClick = this.handlePersonalInfoClick.bind(this);
    this.handleMyHistoryClick = this.handleMyHistoryClick.bind(this);
    this.state = { mainPageChoice: 1 };
  }

  handleUploadGoodClick() {
    this.setState((state) => {
      return { mainPageChoice: 1 };
    });
  }

  handleViewRankClick() {
    this.setState((state) => {
      return { mainPageChoice: 2 };
    });
  }

  handlePersonalInfoClick() {
    this.setState((state) => {
      return { mainPageChoice: 3 };
    });
  }

  handleMyHistoryClick() {
    this.setState((state) => {
      return { mainPageChoice: 4 };
    });
  }
  

  render() {
    const mainPageChoice = this.state.mainPageChoice;
    let ShownPart;
    switch (this.state.mainPageChoice) {
      case 1:
        ShownPart = <UploadGood />;
        break;
      case 2:
        ShownPart = <ViewRank />;
        break;
      case 3:
        ShownPart = <PersonalInfo />;
        break;
      case 4:
        ShownPart = <MyHistory />;
        break;
      default:
        ShownPart = <PersonalInfo />;
    }

    
    /* const classes = useStyles(); */
    return (
      <main>
        {/* <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${'https://source.unsplash.com/random'})` }}>
          {<img style={{ display: 'none' }} src={'https://source.unsplash.com/random'} alt={'main image description'} />}
          <div className={classes.overlay} />
          <Container maxWidth="sm">
            <div className={classes.mainFeaturedPostContent}>
              <Typography align="center" component="h1" variant="h3" color="inherit" gutterBottom>
              Personal Mainpage
              </Typography>
            </div>
          </Container>
        </Paper> */}
        <Paper style={{ backgroundImage: `url(${'https://picsum.photos/1000/300'})` }}>
            {<img style={{ display: 'none' }} src={'https://picsum.photos/1000/300'} alt={'Oops, Picture is Gone!'} />}
            <div />
            <Container maxWidth="sm">
                <div >
                    <Typography align="center" component="h1" variant="h3" color="white"  gutterBottom>
                    Personal Mainpage
                    </Typography>
                </div>
            </Container>
        </Paper>
        {/* <h1>Personal Mainpage of {this.props.name}</h1> */}

      <div className="body" align="center">
        <ButtonGroup variant="contained" size="large" color="primary" aria-label="contained primary button group">
          <Button onClick={this.handleUploadGoodClick}>Upload Good</Button>
          <Button onClick={this.handleViewRankClick}>View My Rank</Button>
          <Button onClick={this.handlePersonalInfoClick}>Personal Info</Button>
          <Button onClick={this.handleMyHistoryClick}>My History</Button>
        </ButtonGroup>
        </div>

        <Container maxWidth="md" style={{ backgroundColor: '#e3f2fd' }}>
          {ShownPart}
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
export default Mainpage;