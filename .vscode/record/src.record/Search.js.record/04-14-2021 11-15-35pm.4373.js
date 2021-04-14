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
    console.log(props);
    console.log(props.goods);
    console.log("yes!");

    //const carts = props.location.state.carts;

    //console.log(props);
    // So strange!!!
    //console.log(props.location.state.carts.carts);
    // filter unsold goods

    let allGood = props.goods;
    let allUser = props.user_info;

    let filter = allGood.filter(item => {
        //return country.name.toLowerCase().includes(inputs.toLowerCase())
        if (!item.isSold) {
            return item;
        }
    })

    allGood = filter;

    const title = "Search";
    const content = "Search your wanted product in multiple ways";

    const catagory = ""//"Search Result";

    // Product or user?
    const [msg, setMsg] = useState('');

    const callBack = (childMsg) => {
        setMsg(childMsg);
    };
    console.log(msg);

    // What price?
    {/*const prices = ["HKD 0~50", "HKD 50~100", "HKD 100~150", "HKD 100~150", "HKD 100~150", "City U", "LU"];

    const [school, setSchool] = useState('');

    const schoolBack = (childSchool) => {
        setSchool(childSchool);
    };
    console.log(school);*/}


    const [flag, setFlag] = React.useState(1);
    const handleChange = (event) => {
        setFlag(event.target.value);
    };

    console.log("search flag is" + flag);

    const [input, setInput] = useState('');
    const [goodDefault, setgoodDefault] = useState();
    const [good, setgood] = useState();
    const [userDefault, setuserDefault] = useState();
    const [users, setusers] = useState();

    // What tags?
    const tagger = ["Book, Teaching Materials", "Clothes, Bags", "Electronic Devices", "Cosmetics, Detergents",
        "Food, Drink, Cooking Materials", "Luxuries", "Medicine", "Sports Equipment", "Others"];

    const [tag, setTag] = useState('');

    const fetchData = async () => {
        setgood(allGood);
        setgoodDefault(allGood);
        setusers(allUser);
        setuserDefault(allUser);
    }

    const tagBack = (childTag) => {
        setTag(childTag);
        setInput('');
    };
    console.log(tag);

    // What region?
    const region = ["Hong Kong Island", "Kowloon", "New Territories"];

    const [loc, setLoc] = useState('');

    const locBack = (childLoc) => {
        setLoc(childLoc);
        setInput('');
    };
    console.log(loc);

    // What school?
    const schools = ["CUHK", "HKU", "HKUST", "Poly U", "HKBU", "City U", "LU", "Others"];

    const [school, setSchool] = useState('');



    const schoolBack = (childSchool) => {
        setSchool(childSchool);
        setInput('');
    };
    console.log(school);



    const updateInput = async (inputs) => {
        let filtered = goodDefault.filter(item => {
            if ((tag) && item.tags.some(i => i.tag.toLowerCase().includes(tag.toLowerCase()))) {
                return item;
            }
            if (!tag) {
                return item;
            }
        })

        filtered = goodDefault.filter(item => {
            if ((loc) && item.tags.some(i => i.tag.toLowerCase().includes(loc.toLowerCase()))) {
                return item;
            }
            if (!loc) {
                return item;
            }
        })

        filtered = filtered.filter(item => {
            if (flag == 3) {
                return item.name.toLowerCase().includes(inputs.toLowerCase())
            }
            if (flag == 2) {
                return item.estimated_price <= inputs
            }
            if (flag == 1) {
                return item.name.toLowerCase().includes(inputs.toLowerCase())
            }
        })

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
                return ite.name.toLowerCase().includes(school.toLowerCase())
            }
            if (flag == 1) {
                return ite.name.toLowerCase().includes(inputs.toLowerCase())
            }
        })

        /*
        filtered = filtered.filter(item => {
            if(item.tags.some(cat => cat === tag)){
                return item;
            }
        })*/
        setInput(inputs);
        setgood(filtered);
        setusers(userfiltered);
    }

    useEffect(() => { fetchData() }, []);

    console.log(good);
    console.log(users);

    let length = allGood.length;

    if (good) {
        length = good.length;
    }

    let num = allUser.length;

    if (users) {
        num = users.length;
    }

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
                                            <MenuItem value={2}>Highest Price</MenuItem>
                                            <MenuItem value={3}>Related Class</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={tagger} tagKind="Tag" parentTag={tagBack} />
                                </div>

                                <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={region} tagKind="Loc" parentTag={locBack} />
                                </div>

                                <div style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 18 }}>
                                    <Checker tags={schools} tagKind="School" parentTag={schoolBack} />
                                </div>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={9} md={9}>
                        <div className="col-xs-12 col-sm-6">
                            {(!input) && (msg != 1) && <Display catagory={catagory} products={allGood} myId={props.my_id} allUser={props.user_info} />}

                            {input && (msg != 1) && <Display catagory={catagory} products={good} myId={props.my_id} allUser={props.user_info} />}

                            {input && (msg != 1) &&
                                <Typography align="center" variant="h6" color="textSecondary" paragraph>
                                    {length} Products Found
                                </Typography>
                            }

                            {(!input) && (msg == 1) && <DisplayUser catagory={catagory} products={schoolUser} myId={props.my_id} />}

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