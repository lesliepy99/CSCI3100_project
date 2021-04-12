import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import Nav from './Nav';
import Booklist from './Booklist';
import Comment from './Comment';
import Mainpage from './Mainpage';
import './App.css';
import Footer from './Footer';
import Product from './Product';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
            <Container>
                <Col>
                    <div className="app">
                        <Router>
                            <Nav />
                            <Switch>
                                <Route path='/home/booklist'>
                                    <Booklist />
                                </Route>
                                <Route path='/home/comment'>
                                    <Comment />
                                </Route>
                                <Route path='/home/mainpage'>
                                    <Mainpage name="Jack" />
                                </Route>
                                
                                <Route path='/product/:id' component={Product}/>

                            </Switch>
                        </Router>

                    </div>
                </Col>
            </Container>
            <Footer/>
            </React.Fragment>
        );
    }
}

export default Home;