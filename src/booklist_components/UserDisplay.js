import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { useState, useEffect } from 'react';

import getImageUrl from '../utils/getImageUrl';

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
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const DisplayUser = props => {
    const catagory = props.catagory;
    const products = props.products;

    const classes = useStyles();

    //const myId = props.myId;

    let len = products.length;
    //console.log(len);
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
    //console.log(list);

    const [flag, setFlag] = React.useState('');
    const [goods, setGoods] = React.useState('');

    const changePage = async (e, pageNumber) => {
        console.log(e, pageNumber);
        //pageNumber.style = "contained";
        let array = products;
        setFlag(pageNumber);
        setGoods(array.slice((pageNumber - 1) * 9, pageNumber * 9));
    };
    //console.log(flag);
    //console.log(goods);
    useEffect(() => { changePage() }, []);

    let sample = products;
    sample = sample.slice(0, 9);


    if (goods.length != 0) {
        return (
            <Container className={classes.cardGrid} maxWidth="md">
                <div pclassName={classes.catagory}>
                    <Typography variant="h8" component="h2" paddingRight={140} gutterBottom>
                        {catagory}
                    </Typography>
                </div>

                <Grid container spacing={4}>
                    {goods && goods.map((post) => {
                        if (post) {
                            return (
                                <Grid item key={post} xs={12} sm={4} md={4}>
                                    <Grid className={classes.cardGrid}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {post.name[0]}
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                title={post.name}
                                                subheader={post.school}
                                            />
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={getImageUrl("user_avatar", post._id)}//'https://source.unsplash.com/featured/?people'
                                                title="Paella dish"
                                            />
                                        </Card>
                                    </Grid>
                                </Grid>
                            )
                        }
                        return null
                    })}
                </Grid>

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
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {post.name[0]}
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                title={post.name}
                                                subheader={post.school}
                                            />
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={image={getImageUrl("user_avatar", post._id)}}//'https://source.unsplash.com/featured/?people'
                                                title="Paella dish"
                                            />
                                        </Card>
                                </Grid>
                            )
                        }
                        return null
                    })}
                </Grid>

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

export default DisplayUser;