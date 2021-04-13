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

import Header from './Header';
import Display from './Display';
import Bar from './Bar';
import SearchBar from './SearchBar';
import CountryList from './CountryList';

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
    const products = [
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
        }, {
            id: 4,
            title: 'iPhone4s',
            price: '$130',
            image: 'https://source.unsplash.com/featured/?iPhone4s'
        }, {
            id: 5,
            title: 'iPad mini',
            price: '$100',
            image: 'https://source.unsplash.com/featured/?ipad'
        }, {
            id: 6,
            title: 'Camera',
            price: '$999',
            image: 'https://source.unsplash.com/featured/?camera'
        }, {
            id: 7,
            title: 'T-shirt',
            price: '$10',
            image: 'https://source.unsplash.com/featured/?shirts'
        }, {
            id: 8,
            title: 'Sunglasses',
            price: '$7',
            image: 'https://source.unsplash.com/featured/?sunglasses'
        }, {
            id: 9,
            title: 'Book - Forest',
            price: '$25',
            image: 'https://source.unsplash.com/featured/?forest'
        },
    ];

    const carts = props.location.state.carts.carts;

    //console.log(props);
    // So strange!!!
    //console.log(props.location.state.carts.carts);

    const title = "Search";
    const content = "Search your wanted product in multiple ways";

    const catagory = ""//"Search Result";

    const [flag, setFlag] = React.useState('');
    const handleChange = (event) => {
        setFlag(event.target.value);
    };

    console.log(flag);

    const [input, setInput] = useState('');
    const [countryListDefault, setCountryListDefault] = useState();
    const [countryList, setCountryList] = useState();


    const fetchData = async () => {
        setCountryList(products);
        setCountryListDefault(products);
    }

    const updateInput = async (inputs) => {
        const filtered = countryListDefault.filter(country => {
            if(inputs){
            if (flag == 3) {
                return country.title.toLowerCase().includes(inputs.toLowerCase())
            }
            if (flag == 2) {
                return country.price.toLowerCase().includes(inputs.toLowerCase())
            }
            if (flag == 1) {
                return country.title.toLowerCase().includes(inputs.toLowerCase())
            }
        }
        })
        setInput(inputs);
        setCountryList(filtered);
    }

    useEffect(() => { fetchData() }, []);

    console.log(countryList);

    let length = products.length;

    if (countryList) {
        length = countryList.length;
    }

    return (
        <div>
            <Bar carts={carts} />

            <Header title={title} content={content} />

            <div className="col-xs-12 col-sm-6" align="center">


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
                        <MenuItem value={2}>Catagory</MenuItem>
                        <MenuItem value={3}>Location</MenuItem>
                    </Select>
                </FormControl>

                <SearchBar
                    input={input}
                    onChange={updateInput}
                />
            </div>

            <Display catagory={catagory} products={countryList} />

            <Typography align="center" variant="h6" color="textSecondary" paragraph>
                {length} Products in Total
            </Typography>

        </div>
    );


}

export default Search