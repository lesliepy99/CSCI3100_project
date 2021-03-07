import React,{Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class Nav extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav>
	          <ul className="nav-links" >
	            <Link to='/booklist'>
	              <li>书单</li>
		        </Link>
                <Link to='/comment'>
                    <li>采购留言</li>
                </Link>
                <Link to='/comment'>
                    <li>商品展示</li>
                </Link>
              </ul>
            </nav>
        );
    }
}

export default Nav;