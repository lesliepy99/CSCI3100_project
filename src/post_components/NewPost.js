import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { io } from "socket.io-client";





class NewPost extends React.Component {



    constructor(props) {
      super(props);
      this.state = { content: ""
     };
      
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({ content: event.target.value });
    }
  
    handleSubmit(event) {
      // 1. add the post to postList
      // 2. navigate back to postList page
      alert("You have created a new post! Click the forum button to view it!");
      event.preventDefault();

      var PostContent = this.state.content; 
      var SenderId = this.props.my_id;
      var Comments = [];


      (async () => {
        await  fetch("http://54.254.174.175:3000/add_post",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: SenderId,
                content: PostContent, 
                comments: Comments,
                
            })
        }).then((response) => response.text()) //change from json to text
        .then((data) => {
            console.log(data)
                               
        }); 
   
   })();

      
    }

    render() {
      console.log("Yes");

      var socket = io.connect();
      socket.on('postChange', data => {
        console.log(data);
        console.log("Changing Post");
  
        this.props.dispatch({ type: 'update_post', data: data })
        // dispatch({type:'UPDATE'});
  
      });
      return (
        <form onSubmit={this.handleSubmit}>
          <h2>Write down what you want here</h2>
          <TextField
            id="standard-full-width"
            label="Please type here"
            variant="outlined"
            multiline
            fullWidth
            rows={8}
            value={this.PostContent}  // set value to be content
            onChange={this.handleChange} 
            />
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  

  function mapStateToProps(state) {
    console.log(state)
    return {
    my_id: state.my_id,
    };
  }
  export default connect(mapStateToProps)(NewPost);
