import React,{Component} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <Container maxWidth={'sm'} style={{backgroundColor: '#e3f2fd'}}>
          <div style={{fontSize: 30}} align='center'>
              Sign In to UTransform
          </div>
          <br/>
          <form align='center'>
            <TextField label="E-mail" id="username" variant="outlined" style={{backgroundColor: 'white'}}/>
            <br />
            <br />
            <TextField label="Password" type="password" id="password" variant="outlined" style={{backgroundColor: 'white'}}/>
            <br />
            <br />
            <br />
            <Link to='./home'>
              <Button type="submit" variant="contained" color="primary" >
                Sign IN
              </Button>
            </Link>
            <br />
            <br />
            <Link to='./sign_up'>
              <Button variant="contained" color="primary">
                Sign UP
              </Button>
            </Link>
            <br />
          </form>
          <br/>
        </Container>
          );
    }
}

export default LoginPage;