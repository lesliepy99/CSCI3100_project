/*
* MODULE Tab
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: A top tab that helps choose from product or user search.
* Reference:  https://material-ui.com/zh/components/tabs/
*/


/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


// css styles for Material UI components
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: "auto",
  },
});


const Taber = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // handle change from clicking on tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    props.parentMsg(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        {/* provide product search and user search */}
        <Tab icon={<ShoppingBasketIcon />} label="PRODUCTS" />
        <Tab icon={<PersonPinIcon />} label="USER" />
      </Tabs>
    </Paper>
  );
}
export default Taber;