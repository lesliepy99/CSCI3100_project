import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';

import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Hidden from '@material-ui/core/Hidden';

import { connect } from 'react-redux';

import getImageUrl from '../utils/getImageUrl';



const useStyles = makeStyles((theme) => ({
    // search
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginRight: theme.spacing(0),
        marginLeft: 140,

        width: '24%',

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbar: {

        align: 'center',
        alignItems: "center",
        justifyContent: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    // drawer
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

    //cards
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    card: {
        display: 'flex',

    },
    cardDetails: {
        flex: 1,
        paddingBottom: theme.spacing(-2),
    },
    cardMedia: {
        width: 100,
        //height: 150,
    },
}));

const Bar = props => {
    const classes = useStyles();


    let allGood = props.goods;

    console.log(props.user_info);

    // filter my info
    let filter_info = props.user_info.filter(info => {
        if (info._id == props.my_id) {
            console.log(info);
            return info;
        }
    })
    console.log(filter_info);

    let my_info = filter_info[0];

    console.log(my_info);


    // filter shopping cart
    let shopList = [];
    if(my_info){
    shopList = my_info.shopping_list;
    }

    let filtered = allGood.filter(good => {
        if (shopList.some(item => item.good_id === good._id)) {
            return good
        }
    })

    let cartGood = filtered;


    props.dispatch({ type: "default" })
    const myId = props.my_id;

    // delete from cart
    const deleteCart = (e, goodId) => {

        (async () => {
            await fetch('http://localhost:3000/deleteShoppingListItem', {
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
        })().then(props.dispatch({ type: "default" }));

    };

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.dispatch({ type: "default" })
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                style={{ paddingTop: 8, }}
                className={classes.toolbarTitle}
                gutterBottom
            >
                Shopping Cart
              </Typography>

            <Divider />

            {cartGood.map((item) => (
                <Grid className={classes.cardGrid} item xs={12} md={12}>
                    <CardActionArea component="a" href="#"></CardActionArea>
                    <Card className={classes.card}>
                        <Hidden xsDown>
                            <CardMedia className={classes.cardMedia} image={getImageUrl("good_image", item._id)} title="jo" />
                        </Hidden>
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography variant="h8">
                                    {item.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    HK${item.estimated_price}
                                </Typography>


                                <Link to={{
                                    pathname: `/product/${item._id}`, state: {
                                        id: item._id, name: item.name, price: item.estimated_price, tags: item.tags,
                                        description: item.description, sellerId: item.userId, myId: props.my_id, allUser: props.user_info
                                    }
                                }} style={{ textDecoration: 'none' }} className="nav-link">
                                    <Button variant="contained" size="small" color="secondary" >
                                        detail
                                    </Button>
                                </Link>

                                <IconButton color="secondary" aria-label="delete froms shopping cart" onClick={(e) => deleteCart(e, item._id)}>
                                    <DeleteIcon />
                                </IconButton>

                            </CardContent>
                        </div>
                    </Card>


                </Grid>

            ))}

            <Divider />
            <Box textAlign='center' paddingTop={2}>

                <Link to='./cart' style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<LocalMallIcon />}>
                        CHECKOUT
                    </Button>
                </Link>
            </Box>
        </div>
    );

    return (
        <Grid>
            <Toolbar className={classes.toolbar}>
                <IconButton aria-label="shopping cart" onClick={toggleDrawer('left', true)}>
                    <ShoppingCartIcon />
                    {/* <Typography>Cart</Typography> */}
                </IconButton>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>

                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                </Typography>

                <Link to={{ pathname: `/search` }} className="nav-link">
                    <IconButton aria-label="add to shopping cart">
                        <SearchIcon />
                    </IconButton>
                </Link>
            </Toolbar>
        </Grid>
    );
};
function mapStateToProps(state) {
    console.log(state)
    return {
        goods: state.goods,
        user_info: state.user_info,
        my_id: state.my_id,
    };
}
export default connect(mapStateToProps)(Bar);

//export default Bar;