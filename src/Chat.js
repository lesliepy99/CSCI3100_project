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

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state={date: new Date()};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({date: new Date()});
        const send_time=this.state.date;
        const uid_1=this.props.my_id;
        const message_content=event.target.elements.send_text.value;
        console.log('message_content: ', message_content);
        console.log('my_id:', uid_1);
        console.log('send_time:',send_time);
        fetch('http://localhost:3000/add_chat',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid_1: uid_1,
                message_content: message_content,
                send_time: send_time,
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    render() {
        console.log('hello!')
        console.log(this.props.my_id);
        return (
            <Container maxWidth={'md'} >
                <div style={{ backgroundColor: '#35baf6', fontSize: 30 }} align='center' >
                    Chat Box
                </div>
                <div>
                    <Typography id='message-area' component="div" style={{ backgroundColor: '#c1eff4', height: '60vh' }} />
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
function mapStateToProps(state){
    return{
      goods:state.goods,
      my_id:state.my_id
    };
  }
export default connect(mapStateToProps)(Chat);