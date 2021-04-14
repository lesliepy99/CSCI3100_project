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
      // alert("Text was submitted: " + this.state.content);
      event.preventDefault();

      var PostContent = this.state.content; //位置正确吗？
      var SenderId = this.props.sender_id;
      var Comments = this.props.comments;


      (async () => {
        await  fetch("http://localhost:3000/add_post",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: SenderId,
                content: PostContent, 
                comments: Comments,//应该是空白？
                
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
                this.props.dispatch({type:'update_post',data:data}) // what's here?               
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
            id="PostSubmitForm"
            label="Please type here"
            variant="outlined"
            multiline
            rows={4}
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
    sender_id: state.sender_id,
    content: state.content,
    comments: state.comments,
    };
  }
  export default connect(mapStateToProps)(NewPost);
