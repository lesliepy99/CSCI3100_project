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
	              <wt>书单</wt>
		        </Link>
                <Link to='/comment'>
                    <wt>采购留言</wt>
                </Link>
                <Link to='/mainpage'>
                    <wt>个人主页</wt>
                </Link>
                <Link to='/comment'>
                    <wt>商品展示</wt>
                </Link>
              </ul>
            </nav>
        );
    }
}

export default Nav;