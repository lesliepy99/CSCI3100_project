/*
* MODULE ProductName
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: display product name. 
*/

/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// css styles for Material UI components, referring to material ui examples
const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

const Name = props => {
    const name = props.name;
    const classes = useStyles();

    // display name, align center
    return (
        <Grid className={classes.title}>
        <Typography align="center" component="h1" variant="h5"  > 
            {name}
        </Typography>
        </Grid>
    );
};

export default Name;