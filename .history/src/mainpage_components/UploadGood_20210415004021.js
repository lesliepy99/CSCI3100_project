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

import  getConfig from  '../utils/handle_image_upload'
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
      selectedFile: null,
      displayImage: null,
      resultGoodID: null

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

  /* handleSubmit(event) {
    alert('Your ' + this.state.nameOfGood + 'has been uploaded to platform ');
    event.preventDefault();
  } */

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.nameOfGood;
    var description = this.state.shortDescription;
    var estimated_price = this.state.expectedPrice;

    var tags = [
      {
        tag:this.state.typeOfGood
      },{
        tag:this.state.locationOfGood
      }];
    var userId = this.props.my_id;
    var number_of_views = 0;
    var number_of_likes = 0;
    //alert('Your tags are ' + tags );

      /* console.log("This is the upload good information,",
      name ,
      userId ,
      tags ,
      number_of_views ,
      number_of_likes ,
      description ,
      estimated_price ) */
      console.log(this.props.my_id);
      (async () => {
           await fetch('http://54.254.174.175:3000/add_good', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: name,
                userId: userId,
                tags: tags,
                number_of_views: number_of_views,
                number_of_likes: number_of_likes,
                description: description,
                estimated_price: estimated_price
              })
          }).then((response) => response.json())
          .then((data) => {
              console.log("The upload good data (without photo)");
              console.log(data);
              this.state.resultGoodID = data._id;
              var nonsense = this.onFileUpload(); 
                                          
          }); 

          alert('Your good: "' + this.state.nameOfGood + '" has been uploaded along with photo.');
      })();
  
}
  

  onFileChange = event => { 
    // Update the state 
    this.setState({ selectedFile: event.target.files[0],displayImage:URL.createObjectURL(event.target.files[0]) }); 
  }; 

  onFileUpload = () => { 
    console.log("Before call");
    ReactS3Client
    .uploadFile(this.state.selectedFile, this.state.resultGoodID+".png")
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
    return ("nonsense");
   
    
  }; 

  
  render() {

    var socket = io.connect();

    socket.on('userChange', data => {
    console.log(data);
    console.log("Is that right?");

    this.props.dispatch({type:'update_user',data:data['fullDocument']})
    // dispatch({type:'UPDATE'});
    console.log("Update user")

    });

    socket.on('goodChange', data => {
    console.log(data);
    console.log("Is that right?");

    this.props.dispatch({type:'update_good',data:data})
    // dispatch({type:'UPDATE'});

    });
    console.log(this.props.user_info);
    console.log(this.props.goods);
    console.log("Look at here");

    return (
      <div style={{ padding: "5% 5% 15% 15%" }}>
        <h2> Upload good </h2>
        <h3> For adding your good's description, please include: </h3>
        <ul>
          <li>Name</li>
          <li>Type</li>
          <li>Location you sell the good</li>
          <li>Short Description</li>
          <li>Expected Price</li>
          <li>Its Photo</li>
        </ul>

        <form onSubmit={this.handleSubmit}>
          <br /><br />
          <TextField required
            id="nameOfGood"
            name="nameOfGood"
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
          <Select  required
            labelId="typeOfGood-label"
            id="typeOfGood"
            name="typeOfGood"
            value={this.state.typeOfGood}
            onChange={this.handleInputChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Please choose from below listed types:</em>
            </MenuItem>
            <MenuItem value="Book, Teaching Materials">Book, Teaching Materials</MenuItem>
            <MenuItem value="Clothes, Bags">Clothes, Bags</MenuItem>
            <MenuItem value="Cosmetics, Detergents">Cosmetics, Detergents</MenuItem>
            <MenuItem value="Electronic Devices">Electronic Devices</MenuItem>
            <MenuItem value="Food, Drink, Cooking Materials">Food, Drink, Cook Materials</MenuItem>
            <MenuItem value="Luxuries">Luxuries</MenuItem>
            <MenuItem value="Medicine">Medicine</MenuItem>
            <MenuItem value="Sports Equipment">Sports Equipment</MenuItem>
            <MenuItem value="Others">Others</MenuItem>

          </Select>
          {/* <FormHelperText>Label + placeholder</FormHelperText> */}
          <br /><br />


          <InputLabel shrink id="locationOfGood-label">
            Location you want to sell this product:
            </InputLabel>
          <Select  required
            labelId="locationOfGood-label"
            id="locationOfGood"
            name="locationOfGood"
            value={this.state.locationOfGood}
            onChange={this.handleInputChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Please choose from below listed areas:</em>
            </MenuItem>
            <MenuItem value="Hong Kong Island">Hong Kong Island</MenuItem>
            <MenuItem value="Kowloon">Kowloon</MenuItem>
            <MenuItem value="New Territories">New Territories</MenuItem>
          </Select>
          {/* <FormHelperText>Label + placeholder</FormHelperText> */}
          <br /><br />


          <TextField  required
            id="shortDescription"
            name="shortDescription"
            label="Short description:"
            multiline
            rowsMax={8}
            value={this.shortDescription}
            onChange={this.handleInputChange}
            variant="outlined"
          />
          <br /><br />


          <TextField  required
            id="expectedPrice"
            name="expectedPrice"
            label="Expected price (HKD):"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.expectedPrice}
            onChange={this.handleInputChange}
            variant="outlined"
          />
          <br /><br />

         <img id="Preview Photo" alt="Please upload photo, preview will be shown here."
                    src={ this.state.displayImage  } width="96" height="96" />

         <br /><br />
         <input id="Choose_photo" required type="file" onChange={this.onFileChange}/>
          
          <br /><br /><br /><br />
          <FormControlLabel  required
            control={
              <Checkbox required
                checked={this.state.isGoing}
                onChange={this.handleInputChange}
                name="confirmTick"
                color="primary"
              />
            }
            label="I have uploaded precise information about the good."
            labelPlacement="right"
          />
          <br />

          
          <input type="submit" value="Upload" />
          <br /><br /><br /><br />
  
        </form>
      </div>
    );
  }
}



function mapStateToProps(state){
    console.log(state)
    return{
      my_id: state.my_id,
      goods: state.goods,
      posts: state.posts,
      user_info: state.user_info
    };
  }
  export default connect(mapStateToProps)(UploadGood);