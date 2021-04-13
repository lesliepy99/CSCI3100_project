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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
      event.preventDefault();
      var email = event.target.elements.email.value;
      var password = event.target.elements.password.value;
      (async ()=>{
        const response=await fetch("http://localhost:3000/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });
        const resContent=await response.json();
        const veri_ok=resContent.veri_result;
        if(veri_ok){
          console.log("Successfully sign in!");
          this.props.dispatch({type:'signin',data:"lalala"})

        }
        else alert("Wrong email or password!");
      })();
    }

    render(){
        return (
        <Container maxWidth={'sm'} style={{backgroundColor: '#e3f2fd'}}>
          <div style={{fontSize: 30}} align='center'>
              Sign In to UTransform
          </div>
          <br/>
          <form onSubmit={this.handleSubmit} align='center'>
            <TextField required label="E-mail" id="email" name="email" variant="outlined" style={{backgroundColor: 'white'}}/>
            <br />
            <br />
            <TextField required label="Password" type="password" id="password" name="password" variant="outlined" style={{backgroundColor: 'white'}}/>
            <br />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary" >
                Sign IN
            </Button>
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