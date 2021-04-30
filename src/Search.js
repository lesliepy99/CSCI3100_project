// Reference: https://material-ui.com/zh/components/selects/

import React from 'react';
import { useState, useEffect } from 'react';
import ProductName from './product-detail/name';
import ProductImage from './product-detail/image';
import ProductPrice from './product-detail/price';
import ProductSeller from './product-detail/seller';
import ProductBuyActions from './product-detail/actions';
import ProductDetail from './product-detail/detail';

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
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Header from './booklist_components/Header';
import Display from './booklist_components/Display';
import Bar from './booklist_components/Bar';
import SearchBar from './SearchBar';
import Tab from './tab';
import Checker from './Checker';
import DisplayUser from './booklist_components/UserDisplay';
// import CountryList from './CountryList';

import { connect } from 'react-redux';
import { io } from "socket.io-client";

const products = [
    {
        _id: 1,
        name: 'Running Shoes',
        estimated_price: 68,
        image: 'https://source.unsplash.com/featured/?shoes',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Food, Drink, Cooking Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "New Territories"
        }],
    },
    {
        _id: 2,
        name: 'Umbrella',
        estimated_price: 5,
        image: 'https://source.unsplash.com/featured/?umbrella',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Food, Drink, Cooking Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "New Territories"
        }],
    }, {
        _id: 3,
        name: 'Book - The Little Women',
        estimated_price: 20,
        image: 'https://source.unsplash.com/featured/?girl',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Food, Drink, Cooking Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "Hong Kong Island"
        }],
    }, {
        _id: 4,
        name: 'iPhone4s',
        estimated_price: 130,
        image: 'https://source.unsplash.com/featured/?iPhone4s',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Food, Drink, Cooking Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "Hong Kong Island"
        }],
    }, {
        _id: 5,
        name: 'iPad mini',
        estimated_price: 100,
        image: 'https://source.unsplash.com/featured/?ipad',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "FClothes, Bags"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "New Territories"
        }],
    }, {
        _id: 6,
        name: 'Camera',
        estimated_price: 999,
        image: 'https://source.unsplash.com/featured/?camera',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Book, Teaching Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "Kowloon"
        }],
    }, {
        _id: 7,
        name: 'T-shirt',
        estimated_price: 10,
        image: 'https://source.unsplash.com/featured/?shirts',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Book, Teaching Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "Kowloon"
        }],
    }, {
        _id: 8,
        name: 'Sunglasses',
        estimated_price: 7,
        image: 'https://source.unsplash.com/featured/?sunglasses',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Food, Drink, Cooking Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "New Territories"
        }],
    }, {
        _id: 9,
        name: 'Book - Forest',
        estimated_price: 25,
        image: 'https://source.unsplash.com/featured/?forest',
        tags: [{
            "_id": {
                "$oid": "60772bb367ba2210bc728e82"
            },
            "tag": "Food, Drink, Cooking Materials"
        }, {
            "_id": {
                "$oid": "60772bb367ba2210bc728e83"
            },
            "tag": "Kowloon"
        }],
    },
]

const carts = [
    {
        id: 1,
        title: 'Running Shoes',
        price: '$68',
        image: 'https://source.unsplash.com/featured/?shoes'
    },
    {
        id: 2,
        title: 'Umbrella',
        price: '$5',
        image: 'https://source.unsplash.com/featured/?umbrella'
    }, {
        id: 3,
        title: 'Book - The Little Women',
        price: '$20',
        image: 'https://source.unsplash.com/featured/?girl'
    },
]

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
        // Use the system font instead of the default Roboto font.
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

const Search = props => {
    let allGood = props.goods;
    let allUser = props.user_info;

    let filter = allGood.filter(item => {
        if (!item.isSold) {
            return item;
        }
    })

    allGood = filter;

    const title = "Search";
    const content = "Search your wanted product in multiple ways";

    const catagory = ""//"Search Result";

    const [flag, setFlag] = React.useState(1);
    const handleChange = (event) => {
        setFlag(event.target.value);
    };

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

    // What order?
    const orders = ["Low to High", "High to Low"];

    const [order, setOrder] = useState('');

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

    const orderBack = (childOrder) => {
        setOrder(childOrder);
        handleOrder(childOrder);
    };



    // What tags?
    const tagger = ["Book, Teaching Materials", "Clothes, Bags", "Electronic Devices", "Cosmetics, Detergents",
        "Food, Drink, Cooking Materials", "Luxuries", "Medicine", "Sports Equipment", "None"];

    const [tag, setTag] = useState('');
    
    const tagBack = (childTag) => {
        setTag(childTag);
        setInput('');
    };

    // What region?
    const region = ["Hong Kong Island", "Kowloon", "New Territories", "None"];

    const [loc, setLoc] = useState('');

    const locBack = (childLoc) => {
        setLoc(childLoc);
        setInput('');
    };

    // What school?
    const schools = ["CUHK", "HKU", "HKUST", "Poly U", "HKBU", "City U", "LU", "None"];

    const [school, setSchool] = useState('');

    const schoolBack = (childSchool) => {
        setSchool(childSchool);
        setInput('');
    };

    const updateInput = async (inputs) => {
        let filtered = goodDefault.filter(item => {
            if ((tag) && item.tags.some(i => i.tag.toLowerCase().includes(tag.toLowerCase()))) {
                return item;
            }
            if (!tag) {
                return item;
            }
        })

        filtered = filtered.filter(item => {
            if ((loc) && item.tags.some(i => i.tag.toLowerCase().includes(loc.toLowerCase()))) {
                return item;
            }
            if (!loc) {
                return item;
            }
        })

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
        let userfiltered = userDefault.filter(item => {
            if ((school) && item.school.toLowerCase().includes(school.toLowerCase())) {
                return item;
            }
            if (!school) {
                return item;
            }
        })

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
        setInput(inputs);
        setgood(filtered);
        setusers(userfiltered);
    }

    useEffect(() => { fetchData() }, []);

    let length = allGood.length;

    if (good) {
        length = good.length;
    }

    let num = allUser.length;

    if (users) {
        num = users.length;
    }

    // Product or user?
    const [msg, setMsg] = useState('');

    const callBack = (childMsg) => {
        setMsg(childMsg);
        setTag('');
        setLoc('');
        setFlag(1);
    };

    return (
        <div>
            <Bar />

            <Header title={title} content={content} />

            <Tab parentMsg={callBack} />

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
                                            <MenuItem value={1}>Name</MenuItem>
                                            {(msg == 0) && <MenuItem value={2}>Highest Price</MenuItem>}
                                            {(msg == 0) && <MenuItem value={3}>Region</MenuItem>}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={orders} tagKind="Price" parentTag={orderBack} />
                                </div>

                                {(msg == 0) && <><div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={tagger} tagKind="Tag" parentTag={tagBack} />
                                </div>

                                    <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                        <Checker tags={region} tagKind="Loc" parentTag={locBack} />
                                    </div></>}

                                {(msg == 1) && <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={schools} tagKind="School" parentTag={schoolBack} />
                                </div>}
                            </Card>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={9} md={9}>
                        <div className="col-xs-12 col-sm-6">
                            {(!input) && (msg == 0) && <Display catagory={catagory} products={allGood} myId={props.my_id} allUser={props.user_info} />}

                            {input && (msg == 0) && <Display catagory={catagory} products={good} myId={props.my_id} allUser={props.user_info} />}

                            {input && (msg == 0) &&
                                <Typography align="center" variant="h6" color="textSecondary" paragraph>
                                    {length} Products Found
                                </Typography>
                            }

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