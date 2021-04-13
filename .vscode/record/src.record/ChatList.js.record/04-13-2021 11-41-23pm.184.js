import React, { Component } from 'react';
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
