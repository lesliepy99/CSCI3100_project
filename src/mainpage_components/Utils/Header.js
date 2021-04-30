/*
*MODULE Header
*PROGRAMMER: WANG Ruijie
*VERSION: 1.0 (30 April 2021)
*PURPOSE: Get a header to display on the top area, to make the page more beautiful
*/

/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

/**
 * DESCRIPTION: Set up the Material-UI styles 
 */
const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
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
    mainFeaturedPostContent: {
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
 * DESCRIPTION: the Header is set up in such a way that a Title will be displayed
 *              in the middle part, a content will be in below the title, 
 *              and also there will be a background image to beautify the header
 */
const Header = props => {
    const title = props.title;
    const content = props.content;
    const classes = useStyles();

    return (
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${'https://source.unsplash.com/random'})` }}>
            {<img style={{ display: 'none' }} src={'https://source.unsplash.com/random'} alt={'main image description'} />}
            <div className={classes.overlay} />
            <Container maxWidth="sm">
                <div className={classes.mainFeaturedPostContent}>
                    <Typography align="center" component="h1" variant="h3" color="inherit" gutterBottom>
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

/**
 * DESCRIPTION: export the current Module to use          
 */
export default Header;