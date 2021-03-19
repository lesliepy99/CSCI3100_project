import React, { Component } from 'react';
import './App.css';



import Button from '@material-ui/core/Button';
import { fade,makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateIcon from '@material-ui/icons/Create';
import DraftsIcon from '@material-ui/icons/Drafts';






{/* Const of all the components */}
const useStyles = makeStyles((theme) =>({
    root: {
      maxWidth: 450,
    },
    media: {
      height: 140,
    },
    // Styles of Background Image
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://picsum.photos/1000/300)',
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
    // styles of button group
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
      },


  }));
  
  const blogs = [
    {
        title: 'Books',
        content: 'Looking for any science fictions!',
    },
    {
        title: 'Computer',
        content: 'Anyone on campus has laptops on sale?',
    },{
        title: 'Basketball',
        content: 'Need a basketball to replace mine! Contact me if you got any!',
    },{
        title: 'Charger',
        content: 'Badly in need of a charger for my phone and I do not care about the price!',
    },{
        title: ' High-quality Earphone',
        content: 'Got addicted to rock music recently and need a high-quality earphone!',
    },{
        title: 'Interesting Shoes',
        content:'Looking for some interesting shoes!',
    },
]




  {/* function of all the components */}
  function Main() {

    const classes =  useStyles();

    {/* return of all the components */}
    return (
        <main>
        {/* return of 1st component: background image */} 
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${'https://picsum.photos/1000/300'})` }}>
            {<img style={{ display: 'none' }} src={'https://picsum.photos/1000/300'} alt={'Oops, Picture is Gone!'} />}
            <div className={classes.overlay} />
            <Container maxWidth="sm">
                <div className={classes.mainFeaturedPostContent}>
                    <Typography align="center" component="h1" variant="h3" color="inherit"  gutterBottom>
                    My Posts
                    </Typography>
                </div>
            </Container>
        </Paper>
       

        {/* return of 2nd component: menu */} 
        
        <div className={classes.buttonGroup}>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
            <Button startIcon={<CreateIcon />}>New Post</Button>
            <Button startIcon={<DraftsIcon />}>Drafts</Button>
            <Button startIcon={<FavoriteBorderIcon />}>My Likes</Button>
            </ButtonGroup>
        </div>

        {/* return of 3rd component: cards */} 
        <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {blogs.map((blogs) => (
                    <Grid item key={blogs} xs={12} sm={12} md={12}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {blogs.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {blogs.content}
                            </Typography>
                        </CardContent>
                        <CardActions >
                            <Button size="small" color="primary">Learn More</Button>
                            <IconButton >
                            <FavoriteBorderIcon color="secondary"/>
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


class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Main />
            </div>

        );
    }
}

export default Comment;










