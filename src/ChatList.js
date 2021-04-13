import React, { Component } from 'react';
// import {Container,Col,Row} from 'react-bootstrap';

import './App.css';
import books from './books.json';

import Header from './booklist_components/Header';
import Display from './booklist_components/Display';
import Chat from './Chat';

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.location.state.seller,
            
            
        }
    }
    

    render() {
        console.log(this.state.name);
        return (
            <Chat seller={this.props.match.params.id}/>
        );
    }

}
