import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
    },
    catagory: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
        marginLeft: 140,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        variant: "outlined",
    },
    cardMedia: {
        paddingTop: '80%' // '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const Display = props => {
    const catagory = props.catagory;
    const products = props.products;

    const classes = useStyles();

    console.log(catagory);
    console.log(products);
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <div pclassName={classes.catagory}>
                <Typography variant="h8" component="h2" paddingRight={140} gutterBottom>
                    {catagory}
                </Typography>
            </div>

            <Grid container spacing={4}>
                {products && products.map((post) => {
                    if (post) {
                        return (
                            <Grid item key={post} xs={12} sm={4} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={post.image} // "https://source.unsplash.com/featured/?book"
                                            title="Image title"
                                        />
                                    </CardActionArea>

                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h6" >
                                            {post.title}
                                        </Typography>
                                        <Typography variant="h8" component="h2">
                                            {post.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions >
                                        <Link to={{ pathname: `/product/${post.id}`, state: { name: 'Book-Forest', price: "$20" } }} className="nav-link">
                                            <Button variant="contained" size="small" color="secondary" disableElevation>
                                                detail
                                            </Button>
                                        </Link>
                                        <IconButton color="secondary" aria-label="add to shopping cart">
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                    return null
                })}
            </Grid>
        </Container>
    );
};

export default Display;