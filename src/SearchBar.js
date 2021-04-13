import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      position: "relative",
      alignItems: 'center',
      width: 600,
      align: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    searchGrid:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    }
  }));

const SearchBar = ({input:keyword,onChange: setKeyword}) => {
  const classes = useStyles();

  return (
    <Grid className={classes.searchGrid}>
    <Paper elevation={3} component="form" className={classes.root}>
    <IconButton className={classes.iconButton} aria-label="menu">
      <MenuIcon />
    </IconButton>
    <InputBase 
     className={classes.input}   
     key="random1"
     value={keyword}
     placeholder={"search product"}
     onChange={(e) => setKeyword(e.target.value)}
    />
    <IconButton className={classes.iconButton} aria-label="search" >
      <SearchIcon />
    </IconButton>
    
  </Paper>
  </Grid>

   
  );
}

export default SearchBar