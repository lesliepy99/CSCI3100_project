import React,{Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

class SignUpPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container maxWidth={'sm'} style={{backgroundColor: '#e3f2fd'}}>
            <div style={{fontSize: 30}} align='center'>
                Create Your Account
            </div>
            <div style={{fontSize: 15}} align='center'>
                We will send an auth code to you!
            </div>
            <br/>
            <form id="regist_form" action="http://localhost:3000/send_email" method="POST" align='center'> 
                <TextField label="E-mail" id="email" name="email" variant="outlined" style={{backgroundColor: 'white'}}/>
                <br/>
                <TextField type="password"  label="Password" id="password" name="password" variant="outlined" style={{backgroundColor: 'white'}}/>
                <br/>
                <TextField type="password" label="Password Confirm" id="password-confirm" name="password_confirm" variant="outlined" style={{backgroundColor: 'white'}}/>
                <br/>
                <br/>
                <Button variant="contained" type="submit" value="Send">create account</Button>          
            </form>
            <br/>
        </Container>
        );
    }
}

export default SignUpPage;