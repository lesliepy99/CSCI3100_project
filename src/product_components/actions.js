/*
* MODULE ProductActions
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: buttons providing chat and shopping cart functions. 
* Reference: https://material-ui.com/zh/components/buttons/
*/

/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

// css styles for Material UI components, referring to material ui examples
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const Buy = props => {
    const classes = useStyles();
    const sellerId = props.sellerId;
    const myId = props.myId;
    const goodId = props.goodId;

    /* send request to server to add to shopping cart */
    const addCart=(e,good_id)=>{
        (async () => {
            await fetch('http://54.254.174.175:3000/insertShoppingList', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                user_id: myId,
                good_id: {_id: good_id},
               })
           }
           );
       })();

    };

    // Two buttons
    return (
        <div className={classes.root}>
            <Link to={{ pathname: `/chat/${sellerId}`, state: { seller: sellerId, goodId: goodId  } }} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
                I Want
            </Button>
            </Link>

            <Button variant="contained" color="secondary" onClick={(e) => addCart(e, goodId)}>
                Add to Cart
            </Button>
            
            <Divider/>
        </div>
    );
};

export default Buy;