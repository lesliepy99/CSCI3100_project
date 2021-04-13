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

import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Hidden from '@material-ui/core/Hidden';



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
      },
      cardMedia: {
        width: 100,
        height: 150,
      },
}));

const Bar = props => {
    const carts = props.carts;

    const classes = useStyles();

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

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
                className={classes.toolbarTitle}
                gutterBottom
            >
                Shopping Cart
              </Typography>
              
            <Divider />

            {carts.map((item) => (
                <Grid className={classes.cardGrid} item xs={12} md={12}>
                    <CardActionArea component="a" href="#">
                        <Card className={classes.card}>
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia} image={item.image} title="jo" />
                            </Hidden>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography variant="h8">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {item.price}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        x1
                        </Typography>

                                </CardContent>
                            </div>
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}

            <Divider />
            <Box textAlign='center' paddingTop={2}>

                <Link to='./cart'>
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

                <Link to={{ pathname: `/search`, state: { carts: {carts} } }} className="nav-link">
                    <IconButton  aria-label="add to shopping cart">
                        <SearchIcon />
                    </IconButton>
                </Link>
                {/* Search */}
                {/*<div className={classes.search}>
              <div className={classes.searchIcon}>
              <SearchIcon />
              
              </div>

              <InputBase
              placeholder="Search…"
              classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              />
              </div>*/}

            </Toolbar>
        </Grid>
    );
};

export default Bar;