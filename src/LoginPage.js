import React,{Component} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, Col, Row } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
          <Container>
          <div align='center'>
            <Card>
              <CardContent>
                <h4>Sign In to UTransform</h4>
              </CardContent>
              <CardActions>
                <form >
                  <TextField label="E-mail" id="username" />
                  <br/>
                  <TextField label="Password" type="password" id="password" />
                  <br/>
                  <br/>
                  <Link to='./home'>
                  <Button type="submit" variant="contained" color="primary" >
                    Sign IN
                  </Button>
                  </Link>
                  <br/>
                  <br/>
                  <Link to='./sign_up'>
                  <Button variant="contained" color="primary">
                    Sign UP
                  </Button>
                  </Link>
                  <br />
                </form>
              </CardActions>
            </Card>
          </div>
        </Container>
          );
    }
}

export default LoginPage;