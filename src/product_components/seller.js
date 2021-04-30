/*
* MODULE ProductDetail
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: display seller info. 
* Reference: https://material-ui.com/zh/components/cards/
*/


/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// css styles for Material UI components, referring to material ui examples
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    maxWidth: 500,
    height: '100%',
      display: 'flex',
      flexDirection: 'column',
      variant: "outlined",
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Seller = props => {
  let sellerId = props.sellerId;
  const description = props.description;
  const allUser = props.allUser;
  const classes = useStyles();

  /* filter seller information */
  let seller_info = allUser.filter(info => {
    if(info._id == sellerId){
      return info;
    }
  })

  let seller = seller_info[0];

  // display each seller in a card component
  return (
    <Grid className={classes.cardGrid}>
      <Card className={classes.card}>
        {/* seller avatar */}
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {seller.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          // seller name and school
          title={seller.name}
          subheader={seller.school}
        />
        <CardContent>

        {/* seller's description of the product*/}  
        <Typography variant="body2" color="textSecondary" component="p">
            {description}
        </Typography>
      </CardContent>
      </Card>
    </Grid>
  );
};
export default Seller;