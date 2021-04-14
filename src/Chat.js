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

function sortDownDate(message1, message2) {
    return Date.parse(message1.chat_time) - Date.parse(message2.chat_time);
}

function formatDateTime(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    return y + '-' + m + '-' + d+' '+h+':'+minute;  
};

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            date: new Date(),
            // seller: this.props.match.params.id,
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        event.preventDefault();
        const good_id=this.props.goodId;
        const my_id = this.props.my_id;
        const seller_id= this.props.seller;
        const transaction_time=this.state.date;
        console.log(good_id);
        (()=>{
            fetch("http://localhost:3000/create_transaction",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    good_id: good_id,
                    seller_id: seller_id,
                    consumer_id: my_id,
                    transaction_time: transaction_time
                })
            });
        })();

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
        const all_users=this.props.user_info;
        var user1;
        var user2;
        for(var i=0;i<all_users.length;i++){
            var tempID = all_users[i]._id;
            if ( (tempID)==(my_id).toString() ){
                user1=all_users[i];
            }
            if((tempID)==(seller_id).toString()){
                user2 =all_users[i];
            }
        }
        const username1=user1.name;
        const username2=user2.name;
        var cur_chats=[];
        console.log('yes, there are chats:',all_chats);
        for(var i=0;i<all_chats.length;i++){
            var tempTwoUid = all_chats[i].two_user_id;
            var temp_uid_1 = tempTwoUid[0].id;
            var temp_uid_2 = tempTwoUid[1].id;
            if ( ((temp_uid_1)==(my_id).toString() && (temp_uid_2)==(seller_id).toString()) || ((temp_uid_1)==(seller_id).toString() && (temp_uid_2)==(my_id).toString()) ){
                cur_chats.push(all_chats[i]);
                console.log("add one item to cur_chats!");
            }
        }
        console.log("two user are:",username1,"and",username2);
        var cur_messages=[];
        for(var i=0;i<cur_chats.length;i++){
            cur_messages=cur_messages.concat(cur_chats[i].messages)
        }
        cur_messages=cur_messages.sort(sortDownDate);
        console.log('wuxiang debug:',cur_messages);
        var displayMessage=``;
        for(var i=0;i<cur_messages.length;i++){
            var sender_name=cur_messages[i].senderId==my_id?username1:username2;
            var time=new Date(cur_messages[i].chat_time);
            displayMessage+=`${sender_name} (at  ${formatDateTime(cur_messages[i].chat_time)}): ${cur_messages[i].content}<br/>`;
        }

        return (
            <Container maxWidth={'md'} >
                <div style={{ backgroundColor: '#35baf6', fontSize: 30 }} align='center' >
                    Chat Box
                </div>
                <div style={{ backgroundColor: '#c1eff4'}} align='right'>
                  <Button onClick={this.handleClick} variant="contained">
                      Begin Transaction!
                  </Button>
                </div>
                <hr/>
                <div>
                    <Typography id='message_area' component="div" style={{ backgroundColor: '#c1eff4', height: '60vh' }}>
                        <div dangerouslySetInnerHTML={{__html: displayMessage}}/>
                    </Typography>
                </div>
                <hr/>
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
      user_info: state.user_info,
      my_id:state.my_id,
      my_chats: state.my_chats,
      seller_id: ownProps.seller,
      goodId: ownProps.goodId
    };
  }
export default connect(mapStateToProps)(Chat);