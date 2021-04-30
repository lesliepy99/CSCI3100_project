/*
* MODULE SearchBar
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: A search bar supporting product/user search.
* Reference: https://material-ui.com/zh/components/text-fields/
*/


/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

// css styles for Material UI components
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
  searchGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  }
}));


/**
 * MODEULE SearchBar
 * DATA STRUCTURE: 
 *   - Method: search function
 * ALGORITHM (IMPLEMENTATION) : pass input value back to parents
 */
const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.searchGrid}>
      <Paper component="form" className={classes.root}>
        {/* An unused menu icon */}
        <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        {/* Input field */}
        <InputBase
          className={classes.input}
          value={keyword}
          placeholder={"Search"}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* An unused search icon */}
        <IconButton className={classes.iconButton} aria-label="search" >
          <SearchIcon />
        </IconButton>

      </Paper>
    </Grid>
  );
}

export default SearchBar