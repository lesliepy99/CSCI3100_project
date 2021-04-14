import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    detailGrid: {
      paddingTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    listItem: {
        marginTop: theme.spacing(1),
      },
  }));

const Detail = props => {
    let features = props.features;
    const classes = useStyles();

    console.log(features);
    return (
        <div>
        <Grid className={classes.detailGrid}>
            <Typography component="h1" variant="h5"  > 
                Product Highlights
            </Typography>
        </Grid>
        
        <Grid>
            <ul>
            {features.map((feature) => (
                <li style={{color: "grey"}} className={classes.listItem}>
                    <Typography color="textSecondary" component="p">
                        {feature.tag}
                    </Typography> 
                </li>
            ))}
            </ul>
        </Grid>
        </div>
    );
};

export default Detail;