import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
        paddingTop: '110%' // '56.25%', // 16:9
    },
}));

const Image = props => {
    const source = props.images;
    const classes = useStyles();

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
            <Grid >
        </Grid>

        {/*<Grid container className={classes.media}>
            

                <img style={{ width: 400, height: 500 }} src={source} />
         </Grid>*/}
        </Grid>
    );
};

export default Image;