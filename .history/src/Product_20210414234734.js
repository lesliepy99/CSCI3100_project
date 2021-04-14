import React from 'react';
import ProductName from './product-detail/name';
import ProductImage from './product-detail/image';
import ProductPrice from './product-detail/price';
import ProductSeller from './product-detail/seller';
import ProductBuyActions from './product-detail/actions';
import ProductDetail from './product-detail/detail';
import Bar from './booklist_components/Bar';

import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import getImageUrl from './utils/getImageUrl';

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allUser: this.props.location.state.allUser,
            id: this.props.location.state.id,
            myId: this.props.location.state.myId,
            name: this.props.location.state.name,
            images: getImageUrl("good_image", this.props.match.params.id),//'https://source.unsplash.com/random',
            price: this.props.location.state.price,
            seller: { "name": "Sherlock", "id": 1, "location": "cuhk"},
            sellerId: this.props.location.state.sellerId,
            offers: [{ "Description": "Now 80% off!" }, { "Description": "Only today!" }],
            description: this.props.location.state.description,
            features: [
                "Wattage Output: 1100 Watts",
                "Number of Speeds: 3 ",
                "Capacity (volume): 72.0 Oz.",
                "Appliance Capabilities: Blends",
                "Includes: Travel Lid",
                "Material: Plastic",
                "Finish: Painted",
                "Metal Finish: Chrome",
            ],
            feature: this.props.location.state.tags,
        }
    }

    render() {
        console.log(this.props);
        console.log(this.props.match.params.id);

        return (
            <div>
                <Bar />
                <Container style={{flexGrow: 1}} >
                    <Grid container spacing={5}>
                        <Grid item xs={false} sm={4} md={6}>
                                <ProductName name={this.state.name} />
                                <ProductImage images={this.state.images} />
                        </Grid>

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