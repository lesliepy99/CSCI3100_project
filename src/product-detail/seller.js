import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    paddingTop: '56.25%', // 16:9
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

  let seller_info = allUser.filter(info => {
    //return country.name.toLowerCase().includes(inputs.toLowerCase())
    if(info._id == sellerId){
      return info;
    }
  })

  let seller = seller_info[0];

  console.log(seller);
  return (
    <Grid className={classes.cardGrid}>
      <Card className={classes.card}>
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
          title={seller.name}
          subheader={seller.school}
        />
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {description}
        </Typography>
      </CardContent>
      </Card>
    </Grid>


  );
};

export default Seller;