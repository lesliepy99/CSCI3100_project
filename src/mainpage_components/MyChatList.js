/*
* MODULE MyChatList
* PROGRAMMER: WU Xiang
* VERSION: 1.0 (30 April 2021)
* PURPOSE: Keep a chatlist for each user to find their chats with other users
*/

import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { io } from "socket.io-client";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import Divider from '@material-ui/core/Divider';

class MyChatList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const uid_1=this.props.my_id;
        const all_chats=this.props.my_chats;
        const all_users=this.props.user_info;
        var chat_users=[];
        var data =[]

        // find all chats of the current user
        for(var i=0;i<all_chats.length;i++){
            var tempTwoUid = all_chats[i].two_user_id;
            var temp_uid_1 = tempTwoUid[0].id;
            var temp_uid_2 = tempTwoUid[1].id;
            if ((temp_uid_1)==(uid_1).toString() ){
                chat_users.push(temp_uid_2);
            }
            else{if((temp_uid_2)==(uid_1).toString()) {
                chat_users.push(temp_uid_1);
            }}
        }

        // find all usernames of the chats
        var renderItem=``;
        for(var i=0;i<chat_users.length;i++){
            var uid_2=chat_users[i];
            var tempUser;
            for(var i=0;i<all_users.length;i++){
                var tempID = all_users[i]._id;
                if ( (tempID)==(uid_2).toString() ){
                    tempUser=all_users[i];
                    break;
                }
            }
            var username=tempUser.name;
            data.push([{"id":uid_2},{"username":username}])
            renderItem+=`
                <Link to={{ pathname: '/chat/${uid_2}', state: { seller: "${uid_2}"  } }}>
                  <ListItem button>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="${username}" />
                  </ListItem >
                </Link><Divider/>
            `
        }
        console.log(renderItem);
        console.log(data)
        
        data.map((item) => (console.log(item)))
        data.map((item) => (console.log(item['id'])))
        return (
            <List component="nav" aria-label="main mailbox folders">
               {data.map((item) => (
                   <Link to={{ pathname: '/chat/'+item[0].id, state: { seller: item[0].id  } }}>
                   <ListItem button>
                     <ListItemIcon>
                       <ChatIcon />
                     </ListItemIcon>
                     <ListItemText primary={`${item[1].username}`} />
                   </ListItem >
                 </Link>
              ))}
            </List>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        my_id: state.my_id,
        transactions: state.transactions,
        user_info: state.user_info,
        my_chats: state.my_chats
    };
}
export default connect(mapStateToProps)(MyChatList);