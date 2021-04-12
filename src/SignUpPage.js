import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { PausePresentationTwoTone } from '@material-ui/icons';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state={verification: false};
        this.handleSubmit = this.handleSubmit.bind(this);
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
            const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
            if (!regEmail.test(email)) {
                alert("Invalid email format!")
                info_valid = false;
            }
            if (password.length < 6) {
                alert("The length of password should be at least 6!");
                info_valid = false;
            }
            if (password != password_confirm) {
                alert("Your input passwords are not the same!");
                info_valid = false;
            }
            if(nickname==""){
                alert("Please take a nickname for yourself!");
                info_valid = false;
            }
            if (school == "") {
                alert("you must choose a school!");
                info_valid = false;
            }
            if (info_valid) {
                fetch('http://localhost:3000/send_email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
                this.setState({verification: true});
                var input_area=document.getElementById("input_area");
                var verify_area=document.getElementById("verify_area");
                var prompt=document.getElementById("prompt");
                input_area.style="display: none";
                prompt.innerHTML=`We sent an auth code to your email ${email}, please complete the verification within 5 minutes. If you didn't receive the auth code or your auth code is expired, please refresh the Web page and fill the registration form again.`;
                verify_area.style="display: block";
            }
        }
        if(this.state.verification){
            var authcode=event.target.elements.authcode.value;
            console.log("when verification,",email,password,nickname,school,authcode);
            fetch('http://localhost:3000/register', {
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
                })
                .then(res => {
                    if(res.json().veri_result){
                        sign_up_area=document.getElementById("sign_up_area");
                        sign_up_area.style="display: none";
                        sign_up_area.style="display: block";
                    }
                    else(alert("Fail to verify, your auth code is wrong or expired!"));
                })
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <Container maxWidth={'sm'} style={{ backgroundColor: '#e3f2fd' }}>
              <div id="sign_up_area">
                <div style={{ fontSize: 30 }} align='center'>
                    Create Your Account
                </div>
                <br />
                <form id="regist_form" onSubmit={this.handleSubmit} align='center'>
                    <div id="input_area">
                        <TextField label="E-mail" id="email" name="email" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br />
                        <br />
                        <TextField type="password" label="Password" id="password" name="password" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br />
                        <br />
                        <TextField type="password" label="Password Confirm" id="password-confirm" name="password_confirm" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br />
                        <br />
                        <TextField label="nickname" id="nickname" name="nickname" variant="outlined" style={{ backgroundColor: 'white' }} />
                        <br/>
                        <br />
                        <TextField fullWidth select variant={'outlined'} id="school" name='school' label='Choose your school:' style={{ backgroundColor: 'white' }}>
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
                <br />
              </div>
              <div style={{ fontSize: 30, display:'none' }} align='center' >You successfully created your account!</div>
            </Container>
        );
    }
}

export default SignUpPage;