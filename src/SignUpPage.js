import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state={verification: false};
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event){
        event.preventDefault();
        this.setState({verification: false});
        var input_area=document.getElementById("input_area");
        var verify_area=document.getElementById("verify_area");
        var refresh_button=document.getElementById("refresh_button");
        input_area.style="display: block";
        verify_area.style="display: none";
        refresh_button.style="display: none";
    }

    handleSubmit(event) {
        event.preventDefault();
        var email = event.target.elements.email.value;
        var password = event.target.elements.password.value
        var password_confirm = event.target.elements.password_confirm.value
        var nickname = event.target.elements.nickname.value;
        var school = event.target.elements.school.value;
        if(!this.state.verification){
            console.log("before the verification,",email,password,nickname,school)
            var info_valid = true;
            if(school=="CUHK"){
                const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+\.?)+\.cuhk\.edu\.hk$/;
                if (!regEmail.test(email)) {
                    alert('Invalid email format! A CUHK email address should be like "xxx@xxx.cuhk.edu.hk"!');                        info_valid = false;
                }
            }
            if (password.length < 6 ) {
                alert("The length of password should be at least 6!");
                info_valid = false;
            }
            if (password != password_confirm) {
                alert("Your input passwords are not the same!");
                info_valid = false;
            }
            if (info_valid) {
                (async ()=> {
                    const response= await fetch('http://54.254.174.175:3000/send_email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                        })
                    });
                    const resContent=await response.json();
                    const isSend=resContent.isSend;
                    if(isSend){
                        this.setState({verification: true});
                        var input_area=document.getElementById("input_area");
                        var verify_area=document.getElementById("verify_area");
                        var prompt=document.getElementById("prompt");
                        var refresh_button=document.getElementById("refresh_button");
                        input_area.style="display: none";
                        prompt.innerHTML=`We sent an auth code to your email ${email}, please complete the verification within 5 minutes. If you didn't receive the auth code or your auth code is expired, please return to the last step and fill the registration form again.`;
                        verify_area.style="display: block";
                        refresh_button.style="display: block";
                    }
                    else{
                        alert("This email has already been token!");
                    }
                })();
            }    
        }
        if(this.state.verification){
            var authcode=event.target.elements.authcode.value;
            console.log("when verification,",email,password,nickname,school,authcode);
            (async () => {
                const response= await fetch('http://54.254.174.175:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        nickname: nickname,
                        school: school,
                        authcode: authcode
                    })
                });
                const resContent=await response.json();
                const veri_ok=resContent.veri_result;
                if(veri_ok){
                    var sign_up_area=document.getElementById("sign_up_area");
                    var success_message=document.getElementById("success_message");
                    sign_up_area.style="display: none";
                    success_message.style="display: block";
                }
                else alert("Fail to verify, your auth code is wrong or expired!");
            })();
        }
    }

    render() {
        return (
            <Container maxWidth={'sm'} style={{ backgroundColor: '#e3f2fd' }}>
              <div id="sign_up_area" style={{display: "block"}}>
                <div style={{ fontSize: 30 }} align='center'>
                    Create Your Account
                </div>
                <br />
                <form id="regist_form" onSubmit={this.handleSubmit} align='center'>
                    <div id="input_area">
                        <TextField required label="E-mail" id="email" name="email" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br />
                        <br />
                        <TextField required type="password" label="Password" id="password" name="password" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br />
                        <br />
                        <TextField required type="password" label="Password Confirm" id="password-confirm" name="password_confirm" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br />
                        <br />
                        <TextField required label="nickname" id="nickname" name="nickname" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br/>
                        <br />
                        <TextField required fullWidth select variant={'outlined'} id="school" name='school' label='Choose your school:' style={{ backgroundColor: 'white' }}>
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="CUHK">The Chinese University of Hong Kong</MenuItem>
                        </TextField>
                        <br />
                        <br />
                        <Button variant="contained" type="submit">Send me an auth code</Button>
                    </div>
                    <div id="verify_area" style={{display: "none"}}>
                        <div id="prompt" style={{ fontSize: 15 }} align="left"></div>
                        <TextField label="Auth Code" id="authcode" name="authcode" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br />
                        <br />
                        <Button variant="contained" type="submit" >Create Account</Button>
                    </div>
                </form>
                <div align='center'>
                    <br/>
                    <Button id="refresh_button" onClick={this.handleClick} variant="contained" style={{display:"none"}}>Go Back to the Last Step and Resend AuthCode</Button>
                </div>
                <br />
              </div>
              <div id="success_message" style={{ fontSize: 30, display:'none' }} align='center' >
                  You successfully created your account!<br/><br/>
                  <Link to="/">
                      <Button variant="contained">Go Back to the Login Page</Button>
                  </Link>
                  <br/>
                  <br/>
              </div>
            </Container>
        );
    }
}

export default SignUpPage;