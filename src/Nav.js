/**
 * MODULE NAV
 * PROGRAMMER: PU Yuan
 * VERSION: 1.0 (28 April 2021)
 * PURPOSE: provide a navigation bar which help users to navigate to other pages
 */

import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
	          <ul className="nav-links" >
	            <Link to='/home/booklist'>
	              <wt>Store</wt>
		        </Link>
                <Link to='/home/comment'>
                    <wt>Forum</wt>
                </Link>
                <Link to='/home/mainpage'>
                    <wt>User</wt>
                </Link>
              </ul>

            </nav>
        );
    }
}

export default Nav;