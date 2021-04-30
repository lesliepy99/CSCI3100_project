/*
* MODULE ProductImage
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: display product image. 
*/


/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

// css styles for Material UI components, referring to material ui examples
const useStyles = makeStyles((theme) => ({
    media: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardGrid: {
        marginLeft: theme.spacing(2),
    },
    card: {
        height: '100%',
        variant: "outlined",
    },
    cardMedia: {
        paddingTop: '110%',
    },
}));


const Image = props => {
    const source = props.images;
    const classes = useStyles();

    // display image
    return (
        <Grid className={classes.cardGrid}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.cardMedia}
                        image={source}
                        title="Image title"
                    />
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default Image;