/*
* MODULE LoginPage
* PROGRAMMER: WU Xiang
* VERSION: 1.0 (30 April 2021)
* PURPOSE: Provide the user login page interface. 
*/

/**
 * Module dependencies and prototypes.
 */
import React,{Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


/**
 * MODEULE LoginPage
 * DATA STRUCTURE: 
 *   - Method: handleSubmit - internal structure
 * ALGORITHM (IMPLEMENTATION) : After the user fill in the login form and submit, 
 *                              send the request to the server. If successfully login, 
 *                              jump to the homepage of the account. 
 */
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     *  Description: On click the submit button, send the request to the server, 
     *               if the email and password match, jump to the homepage.
     *  Parameters:
     *    - email: String
     *    - password: String
     */
    handleSubmit(event){
      event.preventDefault();
      var email = event.target.elements.email.value;
      var password = event.target.elements.password.value;
      (async ()=>{
        const response=await fetch("http://54.254.174.175:3000/login",{
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
        const my_id = resContent.my_id;
        // successfully login
        if(my_id){
          this.props.dispatch({type: 'signin', data: my_id});
          console.log("here,",this.props.my_id);
          this.props.history.push('/home');
        }
        // fail to login
        else alert("Wrong email or password!");
      })();
    }
    
    adminLogin = () =>{
      fetch('http://54.254.174.175:3000/admin')
 
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
            {/* <br />
            <Button  variant="contained" color="primary" onClick={this.adminLogin}>Admin Login</Button>
            <br /> */}
          </form>
          <br/>
        </Container>
          );
    }
}

function mapStateToProps(state){
  return{
    my_id:state.my_id
  };
}
export default connect(mapStateToProps)(LoginPage);