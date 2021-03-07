import React,{Component} from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import './App.css';
import books from './books.json';

class Booklist extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
           <Container>
               <Row>
                   <Col>
                       <p>书单</p>
                       {
                        books.map((item)=>{
                            return(
                                <p>{item.name} {item.author}</p>
                            );
                        })
                       }
                   </Col>
               </Row>
           </Container> 
        );
            
    }
}

export default Booklist;