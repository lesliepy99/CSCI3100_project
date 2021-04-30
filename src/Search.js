/*
* MODULE SearchPage
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: A search page providing advanced search functions
* Reference: https://material-ui.com/zh/components/selects/
*            https://material-ui.com/zh/components/cards/
*            https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/album
*/


/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import { useState, useEffect } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

import Card from '@material-ui/core/Card';
import Header from './booklist_components/Header';
import Display from './booklist_components/Display';
import Bar from './booklist_components/Bar';
import SearchBar from './search_components/SearchBar';
import Tab from './search_components/tab';
import Checker from './search_components/Checker';
import DisplayUser from './booklist_components/UserDisplay';

import { connect } from 'react-redux';
import { io } from "socket.io-client";

// bootstrap styles for Select component. Refer to Material UI: https://material-ui.com/zh/components/selects/
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


/**
 * MODEULE Display
 * DATA STRUCTURE: 
 *   - Method: sorting products,
 *             name matching,
 *             data handling,
 *             different search function,
 *             page number.
 * ALGORITHM (IMPLEMENTATION) : Sort by product price.
 *                              Change search criterias with checkers.
 *                              Handle data filtering with tags, location, school.
 *                              Change searching mode with a selector.
 *                              Setting pages according to product/user number.
 *                              Jump to different page according to input button.
 */
const Search = props => {
    let allGood = props.goods;
    let allUser = props.user_info;

    // content to be displayed in image header
    const title = "Search";
    const content = "Search your wanted product in multiple ways";
    const catagory = ""//"Search Result";

    // filter unsold goods
    let filter = allGood.filter(item => {
        if (!item.isSold) {
            return item;
        }
    })
    allGood = filter;

    // set a flag indicating searching mode
    const [flag, setFlag] = React.useState(1);
    const handleChange = (event) => {
        setFlag(event.target.value);
    };

    // fetch data and set to products and users
    const [input, setInput] = useState('');
    const [goodDefault, setgoodDefault] = useState();
    const [good, setgood] = useState();
    const [userDefault, setuserDefault] = useState();
    const [users, setusers] = useState();

    const fetchData = async () => {
        setgood(allGood);
        setgoodDefault(allGood);
        setusers(allUser);
        setuserDefault(allUser);
    }

    /* Select sorting order form checker */
    const orders = ["Low to High", "High to Low"];

    const [order, setOrder] = useState('');

    // handle different sorting order
    const handleOrder = (currentOrder) => {
        console.log(currentOrder);
        if (currentOrder == "Low to High") {
            goodDefault.sort(function (a, b) {
                return (a.estimated_price - b.estimated_price)
            });
            good.sort(function (a, b) {
                return (a.estimated_price - b.estimated_price)
            });
        }
        else if (currentOrder == "High to Low") {
            goodDefault.sort(function (a, b) {
                return (b.estimated_price - a.estimated_price)
            });
            good.sort(function (a, b) {
                return (b.estimated_price - a.estimated_price)
            });
        }
    };

    // callback function for order
    const orderBack = (childOrder) => {
        setOrder(childOrder);
        handleOrder(childOrder);
    };

    /* Select tags form checker */
    const tagger = ["Book, Teaching Materials", "Clothes, Bags", "Electronic Devices", "Cosmetics, Detergents",
        "Food, Drink, Cooking Materials", "Luxuries", "Medicine", "Sports Equipment", "None"];

    const [tag, setTag] = useState('');
    
    // callback function for tag
    const tagBack = (childTag) => {
        setTag(childTag);
        setInput('');
    };

    /* Select region form checker */
    const region = ["Hong Kong Island", "Kowloon", "New Territories", "None"];

    const [loc, setLoc] = useState('');

    // callback function for region
    const locBack = (childLoc) => {
        setLoc(childLoc);
        setInput('');
    };

     /* Select school form checker */
    const schools = ["CUHK", "HKU", "HKUST", "Poly U", "HKBU", "City U", "LU", "None"];

    const [school, setSchool] = useState('');

    // callback function for school
    const schoolBack = (childSchool) => {
        setSchool(childSchool);
        setInput('');
    };

    /* update input */
    const updateInput = async (inputs) => {
        /* goods filter */
        // filter tags
        let filtered = goodDefault.filter(item => {
            if ((tag) && item.tags.some(i => i.tag.toLowerCase().includes(tag.toLowerCase()))) {
                return item;
            }
            if (!tag) {
                return item;
            }
        })

        //filter region
        filtered = filtered.filter(item => {
            if ((loc) && item.tags.some(i => i.tag.toLowerCase().includes(loc.toLowerCase()))) {
                return item;
            }
            if (!loc) {
                return item;
            }
        })

        //search mode
        filtered = filtered.filter(item => {
            if (flag == 3) {
                return item.tags.some(i => i.tag.toLowerCase().includes(inputs.toLowerCase()))
            }
            if (flag == 2) {
                return item.estimated_price <= inputs
            }
            if (flag == 1) {
                return item.name.toLowerCase().includes(inputs.toLowerCase())
            }
        })

        /* user filter */
        //filter school
        let userfiltered = userDefault.filter(item => {
            if ((school) && item.school.toLowerCase().includes(school.toLowerCase())) {
                return item;
            }
            if (!school) {
                return item;
            }
        })

        //search mode
        userfiltered = userfiltered.filter(ite => {
            if (flag == 3) {
                return ite.name.toLowerCase().includes(inputs.toLowerCase())
            }
            if (flag == 2) {
                return ite.name.toLowerCase().includes(inputs.toLowerCase())
            }
            if (flag == 1) {
                return ite.name.toLowerCase().includes(inputs.toLowerCase())
            }
        })
        // update goods and users
        setInput(inputs);
        setgood(filtered);
        setusers(userfiltered);
    }
    useEffect(() => { fetchData() }, []);

    // diaplay number of searching result
    let length = allGood.length;

    if (good) {
        length = good.length;
    }

    let num = allUser.length;

    if (users) {
        num = users.length;
    }

    // change searching for product or user
    const [msg, setMsg] = useState('');

    const callBack = (childMsg) => {
        setMsg(childMsg);
        setTag('');
        setLoc('');
        setFlag(1);
    };

    return (
        <div>
            {/* Toolbar */}
            <Bar />

            {/* Image header */}
            <Header title={title} content={content} />

            {/* Tab for choosing user or product search */}
            <Tab parentMsg={callBack} />

            {/* Search bar */}
            <div className="col-xs-12 col-sm-6" align="center">
                <Card>
                    <SearchBar
                        input={input}
                        onChange={updateInput}
                    />
                </Card>
            </div>

            <Container style={{ padding: 0 }} >
                <Grid container spacing={5}>
                    <Grid item xs={false} sm={3} md={3}>
                        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Card >
                                {/* A selector for choosing search mode*/}
                                <div style={{ paddingTop: 20, paddingBottom: 20 }} align="center">
                                    <FormControl style={{ minWidth: 200 }}>
                                        <InputLabel id="demo-customized-select-label">Search by...</InputLabel>
                                        <Select
                                            labelId="demo-customized-select-label"
                                            id="demo-customized-select"
                                            defaultValue={1}
                                            value={flag}
                                            onChange={handleChange}
                                            input={<BootstrapInput />}
                                        >
                                            {/* Product search supports name, region, proce searching */}
                                            {/* User search only supports name searching */}
                                            <MenuItem value={1}>Name</MenuItem>
                                            {(msg == 0) && <MenuItem value={2}>Highest Price</MenuItem>}
                                            {(msg == 0) && <MenuItem value={3}>Region</MenuItem>}
                                        </Select>
                                    </FormControl>
                                </div>

                                {/* Price checker */}
                                {(msg == 0) &&<div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={orders} tagKind="Price" parentTag={orderBack} />
                                </div>}

                                {/* Tags checker */}
                                {(msg == 0) && <div><div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={tagger} tagKind="Tag" parentTag={tagBack} />
                                </div>

                                {/* Location checker */}
                                <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={region} tagKind="Loc" parentTag={locBack} />
                                </div></div>}

                                {/* School checker */}
                                {(msg == 1) && <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={schools} tagKind="School" parentTag={schoolBack} />
                                </div>}
                            </Card>
                        </div>
                    </Grid>

                    {/* Display search results (Product/User) */}
                    <Grid item xs={12} sm={9} md={9}>
                        <div className="col-xs-12 col-sm-6">
                            {/* Product search */}
                            {(!input) && (msg == 0) && <Display catagory={catagory} products={allGood} myId={props.my_id} allUser={props.user_info} />}

                            {input && (msg == 0) && <Display catagory={catagory} products={good} myId={props.my_id} allUser={props.user_info} />}

                            {input && (msg == 0) &&
                                <Typography align="center" variant="h6" color="textSecondary" paragraph>
                                    {length} Products Found
                                </Typography>
                            }

                            {/* User searchs */}
                            {(!input) && (msg == 1) && <DisplayUser catagory={catagory} products={allUser} myId={props.my_id} />}

                            {input && (msg == 1) && <DisplayUser catagory={catagory} products={users} myId={props.my_id} />}

                            {input && (msg == 1) &&
                                <Typography align="center" variant="h6" color="textSecondary" paragraph>
                                    {num} Users Found
                                </Typography>
                            }
                        </div>
                    </Grid>
                </Grid>
            </Container>


        </div>
    );


}

function mapStateToProps(state) {
    console.log(state)
    return {
        goods: state.goods,
        user_info: state.user_info,
        my_id: state.my_id,
    };
}
export default connect(mapStateToProps)(Search);

// export default Search