import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
    return (
      <nav className="main-nav">
        <ul>
          <li><NavLink to= {`/${props.menu_1}`}>{props.menu_1}</NavLink></li>
          <li><NavLink to= {`/${props.menu_2}`}>{props.menu_2}</NavLink></li>
          <li><NavLink to= {`/${props.menu_3}`}>{props.menu_3}</NavLink></li>
        </ul>
      </nav>
    )
  }

export default Nav;