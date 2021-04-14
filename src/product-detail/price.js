import React from 'react';
import Divider from '@material-ui/core/Divider';

const Price = props => {
    const price = props.price;

    return (
        <div className="product-price">
            <h1>HK${price} </h1>
            <Divider />
        </div>
        
    );
};

export default Price;