/*
* MODULE Display
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: Display products in store page and search page. 
* Reference: https://material-ui.com/zh/components/cards/
*            https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/album
*/


/**
 * Module dependencies and prototypes.
 */
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import getImageUrl from '../utils/getImageUrl';

import { useState, useEffect } from 'react';

// css styles for Material UI components
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
    },
    catagory: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(6),
        marginLeft: 140,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        variant: "outlined",
    },
    cardMedia: {
        paddingTop: '80%',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

/**
 * MODEULE Display
 * DATA STRUCTURE: 
 *   - Method: use cards to display each product,
 *             containing buttons.
 *             Page number.
 * ALGORITHM (IMPLEMENTATION) : Simple map function.
 *                              Setting pages according to product number.
 *                              Jump to different page according to input button.
 */
const Display = props => {
    const classes = useStyles();

    const catagory = props.catagory;
    const products = props.products;
    const myId = props.myId;

    /* Send request to server to add to shopping cart */
    const addCart = (e, goodId) => {
        (async () => {
            await fetch('http://54.254.174.175:3000/insertShoppingList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: myId,
                    good_id: { _id: goodId },
                })
            }
            );
        })();
    };

    /* set page number and current page number */
    let len = products.length;
    let list = [];

    for (var i = 1; i < len; i++) {
        if (i * 9 >= len) {
            list.push(i);
            i = len;
        }
        else {
            list.push(i);
        }
    }

    const [flag, setFlag] = React.useState('');
    const [goods, setGoods] = React.useState('');

    // change page
    const changePage = async (e, pageNumber) => {
        let array = products;
        setFlag(pageNumber);
        setGoods(array.slice((pageNumber - 1) * 9, pageNumber * 9));
    };

    useEffect(() => { changePage() }, []);

    let sample = products;
    sample = sample.slice(0, 9);

    // page changed
    if (goods.length != 0) {
        return (
            <Container className={classes.cardGrid} maxWidth="md">
                {/* display category */}
                <div pclassName={classes.catagory}>
                <Typography variant="h8" component="h2" paddingRight={140} gutterBottom>
                    {catagory}
                </Typography>
                </div>

                {/* display product scards */}
                <Grid container spacing={4}>
                    {goods && goods.map((post) => {
                        if (post) {
                            return (
                                <Grid item key={post} xs={12} sm={4} md={4}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            {/* product image */}
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image= {getImageUrl("good_image", post._id)}
                                                title="Image title"
                                            />
                                        </CardActionArea>

                                        <CardContent className={classes.cardContent}>
                                            {/* product name */}
                                            <Typography gutterBottom variant="h6" >
                                                {post.name}
                                            </Typography>

                                            {/* product price */}
                                            <Typography variant="h8" component="h2">
                                                HK${post.estimated_price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            {/* link to product detail */}
                                            <Link to={{
                                                pathname: `/home/product/${post._id}`, state: {
                                                    id: post._id, name: post.name, price: post.estimated_price, tags: post.tags,
                                                    description: post.description, sellerId: post.userId, myId: props.myId, allUser: props.allUser
                                                }
                                            }} style={{ textDecoration: 'none' }} className="nav-link">
                                                <Button variant="contained" size="small" color="secondary" disableElevation>
                                                    detail
                                            </Button>
                                            </Link>

                                            {/* add to shopping cart */}
                                            <IconButton color="secondary" aria-label="add to shopping cart" onClick={(e) => addCart(e, post._id)}>
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
                
                {/* page numbers */}
                <div style={{ paddingTop: 16, align: "center" }} align="center">
                    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                        {list.map((page) => {
                            if (flag && flag == page) {
                                return (
                                    <Button variant="contained" onClick={(e) => changePage(e, page)}>
                                        {page}
                                    </Button>
                                )
                            }
                            else {
                                return (
                                    <Button onClick={(e) => changePage(e, page)}>
                                        {page}
                                    </Button>
                                )
                            }
                        })}
                    </ButtonGroup>
                </div>
            </Container>
        );
    }
    // first time loaded
    else {
        return (
            <Container className={classes.cardGrid} maxWidth="md">
                <div pclassName={classes.catagory}>
                <Typography variant="h8" component="h2" paddingRight={140} gutterBottom>
                    {catagory}
                </Typography>
                </div>

                <Grid container spacing={4}>
                    {sample.map((post) => {
                        if (post) {
                            return (
                                <Grid item key={post} xs={12} sm={4} md={4}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            {/* product image */}
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={getImageUrl("good_image", post._id)}
                                                title="Image title"
                                            />
                                        </CardActionArea>

                                        <CardContent className={classes.cardContent}>
                                            {/* product name */}
                                            <Typography gutterBottom variant="h6" >
                                                {post.name}
                                            </Typography>

                                            {/* product price */}
                                            <Typography variant="h8" component="h2">
                                                HK${post.estimated_price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            {/* link to product detail */}
                                            <Link to={{
                                                pathname: `/home/product/${post._id}`, state: {
                                                    id: post._id, name: post.name, price: post.estimated_price, tags: post.tags,
                                                    description: post.description, sellerId: post.userId, myId: props.myId, allUser: props.allUser
                                                }
                                            }} style={{ textDecoration: 'none' }} className="nav-link">
                                                <Button variant="contained" size="small" color="secondary" disableElevation>
                                                    detail
                                                </Button>
                                            </Link>

                                            {/* add to shopping cart */}
                                            <IconButton color="secondary" aria-label="add to shopping cart" onClick={(e) => addCart(e, post._id)}>
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
                
                {/* page numbers */}
                <div style={{ paddingTop: 16, align: "center" }} align="center">
                    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                        {list.map((page) => {
                            if ((flag && flag == page) || (!flag && page == 1)) {
                                return (
                                    <Button variant="contained" onClick={(e) => changePage(e, page)}>
                                        {page}
                                    </Button>
                                )
                            }
                            else {
                                return (
                                    <Button onClick={(e) => changePage(e, page)}>
                                        {page}
                                    </Button>
                                )
                            }
                        })}
                    </ButtonGroup>
                </div>
            </Container>
        );
    }
};

export default Display;