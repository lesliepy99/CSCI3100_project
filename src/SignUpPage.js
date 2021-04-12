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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var email = event.target.elements.email.value;
        var password = event.target.elements.password.value
        var password_confirm = event.target.elements.password_confirm.value
        var nickname = event.target.elements.nickname.value;
        var school = event.target.elements.school.value;
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
                    password: password,
                    password_confirm: password_confirm,
                    school: school,
                })
            })
        }
    }

    render() {
        return (
            <Container maxWidth={'sm'} style={{ backgroundColor: '#e3f2fd' }}>
                <div style={{ fontSize: 30 }} align='center'>
                    Create Your Account
            </div>
                <div style={{ fontSize: 15 }} align='center'>
                    We will send an auth code to you for verification!
            </div>
                <br />
                <form id="regist_form" onSubmit={this.handleSubmit} align='center'>
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
                    <br />
                    <Button variant="contained" type="submit" value="Send">create account</Button>
                </form>
                <br />
            </Container>
        );
    }
}

export default SignUpPage;