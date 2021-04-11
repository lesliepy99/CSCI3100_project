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
    }

    render() {
        console.log('hello!')
        console.log(this.props.my_id);
        return (
            <Container maxWidth={'md'} >
                <div style={{ backgroundColor: '#35baf6', fontSize: 30 }} align='center' >
                    Chat Box {this.props.my_id}!!
                </div>
                <div>
                    <Typography id='message-area' component="div" style={{ backgroundColor: '#c1eff4', height: '60vh' }} />
                </div>
                <form action="http://localhost:3000/add_chat" method="POST" align='center' style={{ backgroundColor: '#c1eff4' }}>
                    <TextField id="send_text" name='send_text' label="Message" multiline variant="outlined" style={{ width: 700, backgroundColor: 'white' }} />
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