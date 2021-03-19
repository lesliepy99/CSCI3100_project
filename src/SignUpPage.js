import React,{Component} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

class SignUpPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container>
          <div>
            <Card>
                <CardContent>
                    <h4 class="center">Create Your Account</h4>
                </CardContent>
                <CardActions>
                    <form id="regist_form" action="http://localhost:3000/process_post" method="POST">
                        <div>
                            <TextField label="E-mail" id="email" name="email" />
                        </div>
                        <div>
                          <TextField type="password"  label="Password" id="password" name="password" />
                        </div>
                        <div>
                            <TextField type="password" label="Password Confirm" id="password-confirm" name="password_confirm" />
                        </div>
                        <br/>
                        <div>
                            <Button variant="contained" type="submit" value="Send">create account</Button>
                        </div>
                    </form>
                </CardActions>
            </Card>
          </div>
        </Container>
        );
    }
}

export default SignUpPage;