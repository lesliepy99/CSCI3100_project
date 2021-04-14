import React, { Component } from 'react';
import './App.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import {connect} from 'react-redux';
import { io } from "socket.io-client";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            date: new Date(),
            // seller: this.props.match.params.id,
            };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({date: new Date()});
        const send_time=this.state.date;
        const uid_1=this.props.my_id;
        const uid_2=this.props.seller_id;
        const message_content=event.target.elements.send_text.value;
        (async ()=>{
            await fetch('http://localhost:3000/create_chat',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid_1: uid_1,
                    uid_2: uid_2,
                    message_content: message_content,
                    send_time: send_time,
                })
            });
        })();
    }

    render() {
        var socket = io.connect();
        socket.on('ChatChange', data => {
            console.log(data);
            console.log("Is that right?");
      
            this.props.dispatch({ type: 'addChat', data: data })     
        });
        console.log('hello! this chat is between:',this.props.my_id,this.props.seller_id)
        const my_id=this.props.my_id;
        const seller_id=this.props.seller_id;
        const all_chats=this.props.my_chats;
        var cur_chats=[];
        console.log('yes, there are chats:',all_chats);
        for(var i=0;i<all_chats.length;i++){
            var tempTwoUid = all_chats[i].two_user_id;
            var temp_uid_1 = tempTwoUid[0];
            var temp_uid_2 = tempTwoUid[1];
            if ( ((temp_uid_1)==(my_id).toString() && (temp_uid_2)==(seller_id).toString()) || ((temp_uid_1)==(seller_id).toString() && (temp_uid_2)==(my_id).toString()) ){
                cur_chats.push(all_chats[i]);
            }
        }

        const message_area=document.getElementById("message-area");
        for(var i=0;i<cur_chats.length;i++){
            var tempContent=cur_chats[i].massages[0].content;
            alert(tempContent);
            message_area.innerHTML+=`${tempContent} <br/>`;
        }


        return (
            <Container maxWidth={'md'} >
                <div style={{ backgroundColor: '#35baf6', fontSize: 30 }} align='center' >
                    Chat Box
                </div>
                <div>
                    <Typography id='message-area' component="div" style={{ backgroundColor: '#c1eff4', height: '60vh' }}>
                        hello, world!
                    </Typography>
                </div>
                <form onSubmit={this.handleSubmit} align='center' style={{ backgroundColor: '#c1eff4' }}>
                    <TextField id="send_text" name='send_text' label="Message" multiline variant="outlined" ref={(c) => this.send_text = c} style={{ width: 700, backgroundColor: 'white' }} />
                    <Button type="submit" variant="contained" color="primary" style={{height: 54}} endIcon={<SendIcon />}>
                        Send
                    </Button>
                </form>

            </Container>
        );
    }
}
function mapStateToProps(state, ownProps){
    return{
      goods:state.goods,
      my_id:state.my_id,
      my_chats: state.my_chats,
      seller_id: ownProps.seller,
    };
  }
export default connect(mapStateToProps)(Chat);