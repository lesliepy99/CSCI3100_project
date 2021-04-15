import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: "auto",
  },
});

const Taber = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        <Tab icon={<ShoppingBasketIcon />} label="PRODUCTS" />
        <Tab icon={<PersonPinIcon />} label="USER" />
      </Tabs>
    </Paper>
  );
}
export default Taber;