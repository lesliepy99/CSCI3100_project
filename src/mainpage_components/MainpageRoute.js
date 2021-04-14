import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import UploadGood from './UploadGood';
import ViewRank from './ViewRank';
import PersonalInfo from './PersonalInfo';
import MyHistory from './MyHistory';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        align: 'center',
        //margin: "10%",
        //padding: "10%",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'justify',
        
        //display: 'flex',
        //flexWrap: 'wrap',
        //'& > *': {
            //margin: theme.spacing(10),
            //width: theme.spacing(30),
            //height: theme.spacing(16),
        //},
    },
}));

const MainpageRoute = props => {
    const choice = props.choice;

    const classes = useStyles();

    let ShownPart;
    switch (choice) {
        case 1:
          ShownPart = <UploadGood />;
          break;
        case 2:
          ShownPart = <ViewRank />;
          break;
        case 3:
          ShownPart = <PersonalInfo />;
          break;
        case 4:
          ShownPart = <MyHistory />;
          break;
        default:
          ShownPart = <PersonalInfo />;
      }

    return (
        <div className={classes.root}>
            <Paper elevation={5}> 
            {ShownPart} 
            </Paper>
        </div>
    );
}

export default MainpageRoute;