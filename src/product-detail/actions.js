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

    return (
        <div className={classes.root}>
            <Link to={{ pathname: `/chat/${sellerId}`, state: { seller: sellerId } }}>
            <Button variant="contained" color="primary">
                I Want
            </Button>
            </Link>

            <Button variant="contained" color="secondary">
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