import React,{Component} from 'react';
import './App.css';

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
        <div className="body">
          <h1>Personal Mainpage of {this.props.name}</h1>
          <button onClick={this.handleUploadGoodClick}>Upload Good</button>
          <button onClick={this.handleViewRankClick}>View My Rank</button>
          <button onClick={this.handlePersonalInfoClick}>Personal Info</button>
          <button onClick={this.handleMyHistoryClick}>My History</button>
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
      alert('Your '+ this.state.nameOfGood + 'has been uploaded to platform ' );
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
          
          <label>
            Name of Good:
            <input
              name="nameOfGood"
              type="text"
              value={this.state.nameOfGood}
              onChange={this.handleInputChange} />
          </label>
          <br /><br />
          <label>
            Type of this product:
            <select value={this.state.typeOfGood} onChange={this.handleInputChange}>
              <option value="bt">Book, Teaching Materials</option>
              <option value="cb">Clothes, Bags</option>
              <option value="cd">Cosmetics, Detergents</option>
              <option value="ed">Electronic Devices</option>
              <option value="fd">Food, Drink, Cook Materials</option>
              <option value="lx">Luxuries</option>
              <option value="md">Medicine</option>
              <option value="sp">Sports Equipment</option>
            </select>
          </label>
          <br /><br />
          <label>
            Location you want to sell this product:
            <select value={this.state.locationOfGood} onChange={this.handleInputChange}>
              <option value="hk">Hong Kong Island</option>
              <option value="kl">Kowloon</option>
              <option value="nt">New Territories</option>
            </select>
          </label>
          <br /><br />
          <label>
            Short description:
            <input
              name="shortDescription"
              type="text"
              value={this.state.shortDescription}
              onChange={this.handleInputChange} />
          </label>
          <br /><br />
          <label>
            Expected price (HKD):
            <input
              name="expectedPrice"
              type="number"
              value={this.state.expectedPrice}
              onChange={this.handleInputChange} />
          </label>
          <br /><br /><br /><br />
          <label>
            I have uploaded precise<br />information about the good:
            <input
              name="confirmTick"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br /><br />
          <input type="submit" value="Upload" />
          
          
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
  