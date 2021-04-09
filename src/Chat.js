import React,{Component} from 'react';
import './App.css';
import { fade,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper  from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) =>({
    root: {
      maxWidth: 450,
    },
    media: {
      height: 140,
    },
    button: {
        margin: theme.spacing(1),
    }
  }));

  function Main(){
    const classes =  useStyles();
    return(
        <Container maxWidth={'md'} >
            <div style={{backgroundColor: '#35baf6', fontSize: 30}} align='center' >
                Chat Box
            </div>
            <div>
                <Typography id='message-area' component="div" style={{ backgroundColor: '#c1eff4', height: '60vh' }} />
            </div>
            <form align='center' style={{backgroundColor: '#c1eff4'}}>
                <TextField id="text-area" label="Message" multiline variant="outlined"  style={{width: 700, backgroundColor: 'white'}}/>
                <Button variant="contained" color="primary" className={classes.button} endIcon={<SendIcon />}>
                    Send
                </Button>
            </form>

        </Container>  
    );
  }

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
          <Main />
        );
    }
}

export default Chat;