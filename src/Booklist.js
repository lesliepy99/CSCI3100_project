import React,{Component} from 'react';
// import {Container,Col,Row} from 'react-bootstrap';
import './App.css';
import books from './books.json';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CameraIcon from '@material-ui/icons/PhotoCamera';

// Drawer
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LocalMallIcon from '@material-ui/icons/LocalMall';

import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      
      padding: theme.spacing(8, 0, 8),

      
      color: theme.palette.common.white,
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(0,0,0,.6)',
      // opacity: 0.2,
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
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
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },

    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        align: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      mainFeaturedPostContent: {
        align: 'center',
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
    },
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
  }));

const cartStyles = makeStyles((theme) => ({
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
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const products = [
    {
        title: 'Running Shoes',
        price: '$68',
        image: 'https://source.unsplash.com/featured/?shoes'
    },
    {
        title: 'Umbrella',
        price: '$5',
        image: 'https://source.unsplash.com/featured/?umbrella'
    },{
        title: 'Book - The Little Women',
        price: '$20',
        image: 'https://source.unsplash.com/featured/?girl'
    },{
        title: 'iPhone4s',
        price: '$130',
        image: 'https://source.unsplash.com/featured/?iPhone4s'
    },{
        title: 'iPad mini',
        price: '$100',
        image: 'https://source.unsplash.com/featured/?ipad'
    },{
        title: 'Camera',
        price: '$999',
        image: 'https://source.unsplash.com/featured/?camera'
    },{
        title: 'T-shirt',
        price: '$10',
        image: 'https://source.unsplash.com/featured/?shirts'
    },{
        title: 'Sunglasses',
        price: '$7',
        image: 'https://source.unsplash.com/featured/?sunglasses'
    },{
        title: 'Book - Forest',
        price: '$25',
        image: 'https://source.unsplash.com/featured/?forest'
    },
]

const carts = [
    {
        title: 'Running Shoes',
        price: '$68',
        image: 'https://source.unsplash.com/featured/?shoes'
    },
    {
        title: 'Umbrella',
        price: '$5',
        image: 'https://source.unsplash.com/featured/?umbrella'
    },{
        title: 'Book - The Little Women',
        price: '$20',
        image: 'https://source.unsplash.com/featured/?girl'
    },
]

function Album() {
    const classes = useStyles();
    const cart = cartStyles();

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
          <Grid className={cart.cardGrid} item xs={12} md={12}>
            <CardActionArea component="a" href="#">
                <Card className={cart.card}>
                <Hidden xsDown>
                    <CardMedia className={cart.cardMedia} image={item.image} title="jo" />
                </Hidden>
                <div className={cart.cardDetails}>
                    <CardContent>
                    <Typography  variant="h8">
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
          <Button
            variant="contained"
            color="secondary"
            endIcon={<LocalMallIcon />}>
            CHECKOUT
          </Button>
          </Box>
        </div>
      );
      
    return (
        <main>
            {/* Tool bar */}
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
                
                <div className={classes.search}>
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
                </div>
                
            </Toolbar>
            </Grid>

            {/* Image background */}
            <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${'https://source.unsplash.com/random'})` }}>
            {<img style={{ display: 'none' }} src={'https://source.unsplash.com/random'} alt={'main image description'} />}
            <div className={classes.overlay} />
            <Container maxWidth="sm">
                <div className={classes.mainFeaturedPostContent}>
                    <Typography align="center" component="h1" variant="h3" color="inherit"  gutterBottom>
                    UTransformer
                    </Typography>
                    <Typography align="center" variant="h5" color="inherit" paragraph>
                    View our newest collections & most popular products
                    </Typography>
                </div>
            </Container>
            </Paper> 

            {/* Display product cards */}
            <Container className={classes.cardGrid} maxWidth="md">
            <div pclassName={classes.catagory}>
                <Typography variant="h8" component="h2" paddingRight={140} gutterBottom>
                            Recommendation
                </Typography>
            </div>
                <Grid container spacing={4}>
                    {products.map((post) => (
                    <Grid item key={post} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                            className={classes.cardMedia}
                            image= {post.image}// "https://source.unsplash.com/featured/?book"
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
                            <Button variant="contained" size="small" color="secondary" disableElevation>
                                detail
                            </Button>
                            <IconButton color="secondary" aria-label="add to shopping cart">
                                <AddShoppingCartIcon />
                            </IconButton>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    )
}
class Booklist extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
           /*<Container>
               <Row>
                   <Col>
                       <p>书单</p>
                       {
                        books.map((item)=>{
                            return(
                                <p>{item.name} {item.author}</p>
                            );
                        })
                       }
                   </Col>
               </Row>
           </Container>*/
           
            <Album/>
        );
            
    }
}

export default Booklist;