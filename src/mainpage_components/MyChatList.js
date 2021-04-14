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
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const uid_1=this.props.my_id;
        const all_chats=this.props.my_chats;
        const all_users=this.props.user_info;
        var chat_users=[];
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
        console.log("wuxiang debug:",chat_users);
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
            renderItem+=`
                <Link to={{ pathname: '/chat/${uid_2}', state: { seller: ${uid_2}  } }}>
                  <ListItem button>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary=${username} />
                  </ListItem >
                </Link><Divider/>
            `
        }
        return (
            <List component="nav" aria-label="main mailbox folders">
              <div dangerouslySetInnerHTML={{__html: renderItem}}>
              {/*<Link to={{ pathname: `/chat/${sellerId}`, state: { seller: sellerId  } }}>
                <ListItem button>
                    <ListItemIcon>
                        <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>
              </Link>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItem>*/}
              </div>
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