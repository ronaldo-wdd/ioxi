import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';


const navItem = (props) => {
    return (
        <li className={classes.Item}>
            <NavLink
                to={props.link}
                exact={props.exact}
                onClick={props.click}
                activeClassName={classes.Active} >
                {props.children}
            </NavLink>
        </li>
    )
}

export default navItem;