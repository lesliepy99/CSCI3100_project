import React, { Component } from 'react';
import './App.css';


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


const ReactS3Client = new S3(getConfig("haha"));


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

    /* const classes =  useStyles(); */

    return (
      <main>
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

        <Container maxWidth="md">
          {ShownPart}
        </Container>
      
      </main>
    );
  }
}

class UploadGood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfGood: "",
      typeOfGood: "",
      locationOfGood: "",
      shortDescription: "",
      expectedPrice: "",
      confirmTick: false,
      selectedFile: null

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Your ' + this.state.nameOfGood + 'has been uploaded to platform ');
    event.preventDefault();
  }
  
  onFileChange = event => { 
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 

  onFileUpload = () => { 
    console.log("Before call");
    ReactS3Client
    .uploadFile(this.state.selectedFile, "test.png")
    .then(data => console.log(data))
    .catch(err => console.error(err))

    // Create an object of formData 
    console.log("Call!")
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "myFile", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
   
    // Details of the uploaded file 
    
    console.log(this.state.selectedFile); 
   
    
  }; 

  
  render() {

    return (
      <div>
        <h2> Please add description of your good: </h2>
        <h3> For your good's description, please include: </h3>
        <ul>
          <li>Name</li>
          <li>Type</li>
          <li>Location you sell the good</li>
          <li>Short Description</li>
          <li>Expected Price</li>
          <li>(Optional) Its Photo</li>
        </ul>

        <form onSubmit={this.handleSubmit}>

          <TextField
            id="nameOfGood"
            label="Name of Good:"
            multiline
            rowsMax={4}
            value={this.nameOfGood}
            onChange={this.handleInputChange}
            variant="outlined"
          />
          <br /><br />

          <InputLabel shrink id="typeOfGood-label">
            Type of this product:
            </InputLabel>
          <Select
            labelId="typeOfGood-label"
            id="typeOfGood"
            value={this.state.typeOfGood}
            onChange={this.handleInputChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Please choose from below listed types:</em>
            </MenuItem>
            <MenuItem value="bt">Book, Teaching Materials</MenuItem>
            <MenuItem value="cb">Clothes, Bags</MenuItem>
            <MenuItem value="cd">Cosmetics, Detergents</MenuItem>
            <MenuItem value="ed">Electronic Devices</MenuItem>
            <MenuItem value="fd">Food, Drink, Cook Materials</MenuItem>
            <MenuItem value="lx">Luxuries</MenuItem>
            <MenuItem value="md">Medicine</MenuItem>
            <MenuItem value="sp">Sports Equipment</MenuItem>
          </Select>
          {/* <FormHelperText>Label + placeholder</FormHelperText> */}
          <br /><br />


          <InputLabel shrink id="locationOfGood-label">
            Location you want to sell this product:
            </InputLabel>
          <Select
            labelId="locationOfGood-label"
            id="locationOfGood"
            value={this.state.locationOfGood}
            onChange={this.handleInputChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Please choose from below listed areas:</em>
            </MenuItem>
            <MenuItem value="hk">Hong Kong Island</MenuItem>
            <MenuItem value="kl">Kowloon</MenuItem>
            <MenuItem value="nt">New Territories</MenuItem>
          </Select>
          {/* <FormHelperText>Label + placeholder</FormHelperText> */}
          <br /><br />


          <TextField
            id="shortDescription"
            label="Short description:"
            multiline
            rowsMax={4}
            value={this.shortDescription}
            onChange={this.handleInputChange}
            variant="outlined"
          />
          <br /><br />


          <TextField
            id="expectedPrice"
            label="Expected price (HKD):"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.expectedPrice}
            onChange={this.handleInputChange}
            variant="outlined"
          />


          <br /><br /><br /><br />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isGoing}
                onChange={this.handleInputChange}
                name="confirmTick"
                color="primary"
              />
            }
            label="I have uploaded precise information about the good:"
            labelPlacement="start"
          />
          <br />
          <input type="submit" value="Upload" />
          <br /><br /><br /><br />
          <input type="file" onChange={this.onFileChange}/> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 

        </form>
      </div>
    );
  }
}

class ViewRank extends React.Component {
  render() {
    return (
      <div>
        <h2> Here is your rank data: </h2>
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
        <button onClick={() => alert("Hello There!")}> Show an alert</button>
      </div>
    );
  }
}

class PersonalInfo extends React.Component {
  render() {
    return (
      <div>
        <h2> I'm feeling Fine Today </h2>
        <h3> My detailed personal information: </h3>
        <ul>
          <li>Name:</li>
          <li>Account ID:</li>
          <li>University:</li>
          <li>Location:</li>
          <li>Education Level:</li>
        </ul>
        <button onClick={() => alert("Hello There!")}>Show an alert</button>
      </div>
    );
  }
}

class MyHistory extends React.Component {
  render() {
    return (
      <div>
        <h2> Your history of selling/purchasing </h2>
        <h3>
          {" "}
            Look what you have obtained and how you maximize the use of resources:{" "}
        </h3>
        <ul>
          <li>Name:</li>
          <li>Account ID:</li>
          <li>University:</li>
          <li>Location:</li>
          <li>Education Level:</li>
        </ul>
        <button onClick={() => alert("Hello There!")}>Show an alert</button>
      </div>
    );
  }
}

// ========================================

//ReactDOM.render(<Mainpage name="Jack" />, document.getElementById("root"));
export default Mainpage;
