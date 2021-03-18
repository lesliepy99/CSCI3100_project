import React, { Component } from 'react';
import './App.css';
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
    return (
      <div className="body" align="center">
        <h1>Personal Mainpage of {this.props.name}</h1>
        <ButtonGroup variant="contained" size="large" color="primary" aria-label="contained primary button group">
          <Button onClick={this.handleUploadGoodClick}>Upload Good</Button>
          <Button onClick={this.handleViewRankClick}>View My Rank</Button>
          <Button onClick={this.handlePersonalInfoClick}>Personal Info</Button>
          <Button onClick={this.handleMyHistoryClick}>My History</Button>
        </ButtonGroup>
        {ShownPart}
      </div>
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
      confirmTick: false

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
