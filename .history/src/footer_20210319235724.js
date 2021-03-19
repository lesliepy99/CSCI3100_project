import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: fade(theme.palette.common.black, 0.2),
      marginTop: theme.spacing(8),
      padding: theme.spacing(2, 0),
      color: theme.palette.common.white,
    },
}));

export default function Footer(props) {
    const classes = useStyles();
  
    return (
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            UTransformer
          </Typography>
          <Typography variant="subtitle1" align="center" component="p">
            CSCI3100 Course Project. Group C5.
          </Typography>
          <Typography variant="subtitle1" align="center" component="p">
            Click the link in the navigation bar to start.
          </Typography>
        </Container>
      </footer>
    );
  }