/*
* MODULE ViewRank
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: To pass the seller ID and goodsID to the Chat component
*/

import React, { Component } from 'react';
import Chat from './Chat';

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.location.state.seller,
            good: this.props.location.state.goodId
        }
    }
    

    render() {
        console.log(this.state.name);
        return (
            <Chat seller={this.props.match.params.id} goodId={this.state.good}/>
        );
    }

}
