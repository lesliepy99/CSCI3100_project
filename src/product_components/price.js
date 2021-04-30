/*
* MODULE ProductDetail
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: display product price. 
*/

/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import Divider from '@material-ui/core/Divider';

const Price = props => {
    const price = props.price;

    // display prices
    return (
        <div className="product-price">
            <h1>HK${price} </h1>
            <Divider />
        </div>
        
    );
};

export default Price;