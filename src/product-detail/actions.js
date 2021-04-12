import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Buy = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary">
                I Want
            </Button>
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