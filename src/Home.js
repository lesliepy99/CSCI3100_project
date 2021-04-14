import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import Nav from './Nav';
import Booklist from './Booklist';
import Comment from './Comment';
import Mainpage from './Mainpage';
import './App.css';
import Footer from './Footer';
import Product from './Product';
import Search from './Search';
import Chat from './Chat';
import ChatList from './ChatList';


import PostDetail from './post_components/PostDetail';
import NewPost from './post_components/NewPost';
import { connect } from 'react-redux';
import { io } from "socket.io-client";
class Home extends Component{
    constructor(props){
        super(props);
    }

  

    componentDidMount() {
        
        fetch("http://localhost:3000/find_specific_transaction",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:this.props.my_id
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
                this.props.dispatch({type:'transaction_init',data:data})
               
           
          
        });    
      }
    
    
    render() {
        console.log("At the beginning");
        console.log(this.props.my_id);
    
      
        return (
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
                                <Route path='/home/NewPost'>
                                    <NewPost />
                                </Route>
                                <Route path='/home/PostDetail'>
                                    <PostDetail />
                                </Route>
                                <Route path='/home/mainpage'>
                                    <Mainpage name="Jack" />
                                </Route>
                                
                                <Route path='/product/:id' component={Product}/>

                                <Route path='/search' component={Search}/>

                                <Route path='/chat/:id' component={ChatList} />
            
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

function mapStateToProps(state) {
    console.log(state)
    return {
        my_id: state.my_id,
        transactions: state.transactions
    };
}
export default connect(mapStateToProps)(Home);
