import React,{Component} from 'react';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Container,Col,Row} from 'react-bootstrap';
import Nav from './Nav';
import Booklist from './Booklist';
import Comment from './Comment';
import Mainpage from './Mainpage';

import './App.css';


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Container>
        <Col>
        <div className="app">
        <Router>
          <Nav />
          <Switch>
            <Route path='/booklist'>
              <Booklist />
            </Route>
            <Route path='/comment'>
              <Comment />
            </Route>
            <Route path='/mainpage'>
              <Mainpage name="Jack"/>
            </Route>
           
          </Switch>
        </Router>
        
      </div>
        </Col>


        
      </Container>
      

      
    );
  }
}

export default App;
