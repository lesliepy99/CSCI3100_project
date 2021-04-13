import React, { Component } from 'react';
import './App.css';



import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
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
import TextField from '@material-ui/core/TextField';

const blogs = [
  {
    title: 'Books',
    content: 'Looking for any science fictions!',
  },
  {
    title: 'Computer',
    content: 'Anyone on campus has laptops on sale?',
  }, {
    title: 'Basketball',
    content: 'Need a basketball to replace mine! Contact me if you got any!',
  }, {
    title: 'Charger',
    content: 'Badly in need of a charger for my phone and I do not care about the price!',
  }, {
    title: ' High-quality Earphone',
    content: 'Got addicted to rock music recently and need a high-quality earphone!',
  }, {
    title: 'Interesting Shoes',
    content: 'Looking for some interesting shoes!',
  },
]

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickPostDetail = this.handleClickPostDetail.bind(this);
    this.state = {showPostDetail: false};
  }
  handleClickPostDetail() {
    this.setState({showPostDetail: true});
  }
  render() {
    const showPostDetail = this.state.showPostDetail;
    let displayContent;
    if (showPostDetail) {
      displayContent = <PostDetail/>
    } else {
      displayContent = <PostList/> 
    }
    return (
      <main>
        {/* return of 1st component: background image */}
        <Paper style={{ backgroundImage: `url(${'https://pixabay.com/images/id-731212/'})` }}>
          {<img style={{ display: 'none' }} src={'https://pixabay.com/images/id-731212/'} alt={'Oops, Picture is Gone!'} />}
          <div />
          <Container maxWidth="sm">
            <div>
              <Typography align="center" component="h1" variant="h3" color="inherit" gutterBottom>
                My Posts
              </Typography>
              <Typography align="center" variant="h5" color="inherit" paragraph>
                Write down what you are looking for
              </Typography>
            </div>
          </Container>
        </Paper>

         {displayContent} 
      </main>
    )
  }

}

{/*The language used in the textEditor is still Chinese */ }

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <Container maxWidth="md">
      <Grid container spacing={4}>
        {blogs.map((blogs) => (
          <Grid item key={blogs} xs={12} sm={12} md={12}>
            <Card >
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  {blogs.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {blogs.content}
                </Typography>
              </CardContent>
              <CardActions >
                <Button size="small" color="primary" onClick={this.handleClickPostDetail}>Learn More</Button>
                <IconButton >
                  <FavoriteBorderIcon color="secondary" />
                </IconButton>

              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    )
  }
}

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = { content: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    // 1. add the post to postList
    // 2. navigate back to postList page
    alert("Text was submitted: " + this.state.content);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Write down what you want here</h2>
        <TextField
          id="standard-multiline-static"
          label="Please type here"
          variant="outlined"
          multiline
          rows={4}
          value={this.state.value}
          onChange={this.handleChange} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class PostDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <h1>This is the Detail of the Post</h1>
    );
  }

}

class NewComment extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <h1>This is the New Comment Page</h1>
    );
  }
}

class CommentList extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <h1>This is the Comment List Page</h1>
    );
  }
}



class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickNewPost = this.handleClickNewPost.bind(this);
    this.state = { commentContent: 1 };
  }
  handleClickNewPost() {
    this.setState(() => {
      return { commentContent: 2 };
    });
  }

  render() {
    let displayContent;
    switch (this.state.commentContent) {
      case 1:
        displayContent = <Main />;
        break;
      case 2:
        displayContent = <NewPost />;
        break;
    }
    return (
      <div align="center">
        <Button startIcon={<CreateIcon />} size="large" color="primary" onClick={this.handleClickNewPost}>New Post</Button>
        {displayContent}
      </div>

    );
  }
}

export default Comment;

















