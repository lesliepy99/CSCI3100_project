import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

const Name = props => {
    const name = props.name;
    const classes = useStyles();
    console.log(name);
    return (
        <Grid className={classes.title}>
        <Typography align="center" component="h1" variant="h5"  > 
            {name}
        </Typography>
        </Grid>
    );
};

export default Name;