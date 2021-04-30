/*
* MODULE Header
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: A image header containing title and discription. 
* Reference: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/blog
*/


/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// css styles for Material UI components
const useStyles = makeStyles((theme) => ({
    backGround: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(2),
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
    content: {
        align: 'center',
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
    },

}));


/**
 * MODEULE Header
 * DATA STRUCTURE: 
 *   - Method: Image header with text content
 * ALGORITHM (IMPLEMENTATION) : Using overlay to darken the background image
 */
const Header = props => {
  const title = props.title;
  const content = props.content;
  const classes = useStyles();

  return (
    <Paper className={classes.backGround} style={{ backgroundImage: `url(${'https://source.unsplash.com/random'})` }}>
    <div className={classes.overlay} />
    <Container maxWidth="sm">
        <div className={classes.content}>
            <Typography align="center" component="h1" variant="h3" color="inherit"  gutterBottom>
            {title}
            </Typography>
            <Typography align="center" variant="h5" color="inherit" paragraph>
            {content}
            </Typography>
        </div>
    </Container>
    </Paper> 
  );
};

export default Header;