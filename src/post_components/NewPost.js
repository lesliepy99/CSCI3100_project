import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';



class NewPost extends React.Component {



    constructor(props) {
      super(props);
      this.state = { content: "" };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({ content: event.target.value });
    }
  
    handleSubmit(event) {
      // 1. add the post to postList
      // 2. navigate back to postList page
      alert("Text was submitted: " + this.state.content);
      event.preventDefault();
    }
    render() {
      console.log("Yes")
      return (
        <form onSubmit={this.handleSubmit}>
          <h2>Write down what you want here</h2>
          <TextField
            id="standard-multiline-static"
            label="Please type here"
            variant="outlined"
            multiline
            rows={4}
            value={this.state.value}
            onChange={this.handleChange} />
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  
  export default NewPost;