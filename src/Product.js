/*
* MODULE Product detail
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: Display product detail page. 
*/

/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import ProductName from './product_components/name';
import ProductImage from './product_components/image';
import ProductPrice from './product_components/price';
import ProductSeller from './product_components/seller';
import ProductBuyActions from './product_components/actions';
import ProductDetail from './product_components/detail';
import Bar from './booklist_components/Bar';

import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import getImageUrl from './utils/getImageUrl';


/**
 * MODEULE Display
 * DATA STRUCTURE: 
 *   - Method: use cards to display each product,
 *             containing buttons.
 *             Page number.
 * ALGORITHM (IMPLEMENTATION) : Use several components to build detail page
 */
export default class Product extends React.Component {
    constructor(props) {
        super(props);

        // define product details get from props
        this.state = {
            allUser: this.props.location.state.allUser,
            id: this.props.location.state.id,
            myId: this.props.location.state.myId,
            name: this.props.location.state.name,
            images: getImageUrl("good_image", this.props.match.params.id),
            price: this.props.location.state.price,
            sellerId: this.props.location.state.sellerId,
            description: this.props.location.state.description,
            feature: this.props.location.state.tags,
        }
    }

    render() {
        return (
            <div>
                {/* Toolbar */}
                <Bar />

                <Container style={{flexGrow: 1}} >
                    <Grid container spacing={5}>
                        {/* product name and image */}
                        <Grid item xs={false} sm={4} md={6}>
                                <ProductName name={this.state.name} />
                                <ProductImage images={this.state.images} />
                        </Grid>

                        {/* product price, seller, buttons, details */}
                        <Grid item xs={12} sm={8} md={6}>
                            <div className="col-xs-12 col-sm-6">
                                <ProductPrice price={this.props.location.state.price} />
                                <ProductSeller sellerId={this.state.sellerId} description={this.state.description} allUser={this.state.allUser}/>
                                <ProductBuyActions sellerId={this.state.sellerId} myId={this.state.myId} goodId={this.state.id}/>
                                <ProductDetail features={this.state.feature} />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }

}