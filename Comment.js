import React,{Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import { io } from "socket.io-client";



class Comment extends Component{
    constructor(props){
        super(props);
    }
   
    render(){
        var socket = io.connect();
        socket.on('mongoStream', data => {
            console.log(data);
            console.log("Is that right?");
            
            this.props.dispatch({type:'TEST',data:data['fullDocument']})
            // dispatch({type:'UPDATE'});
          
          });
        console.log(this.props.user_info);
        return(
            <div>
                <p>{this.props.user_info[0]}</p>

            </div>
            
        );
    }
}
function mapStateToProps(state){
    return{
        user_info:state.user_info
    };
}
export default connect(mapStateToProps)(Comment);