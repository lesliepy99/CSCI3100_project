import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

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

    const addCart=(e,good_id)=>{
        console.log(e,good_id);

        (async () => {
            await fetch('http://localhost:3000/insertShoppingList', {
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
           alert('Good has been added to your shopping cart!');
       })();

    };

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
            
            {/*<Button variant="contained" color="primary" href="#contained-buttons">
                Link
            </Button>*/}
            <Divider/>
        </div>
    );
};

export default Buy;