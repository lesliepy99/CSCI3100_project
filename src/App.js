import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import Home from './Home';
import LoginPage from './LoginPage';

import './App.css';
import SignUpPage from './SignUpPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: 0};
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {  
    this.setState({ logged: 1 })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/sign_up' component={SignUpPage}/>
          <Route path='/' component={LoginPage}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
