import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './Nav.module.css';

const nav = (props) => {
    let allProjsLink = props.show ? "/" : "/all",
        allProjsExact = props.show ? false : true;

    const onLinkClicked = (show, section) => {
        props.onSetShowAllProjs(show);
        props.onSetCurrSection(section);
        
        props.clicked && props.clicked();
    }

    return (
        <nav className={classes.Nav}>
            <ul>
                <NavItem 
                    click={()=>onLinkClicked(!props.show, 0)}
                    link={allProjsLink}
                    exact={allProjsExact} >
                    {/* exact > */}
                    ALL PROJECTS
                    </NavItem>
                <NavItem 
                    link="/about"
                    click={()=>onLinkClicked(false, 1)}>
                    ABOUT
                    </NavItem>
                <NavItem 
                    link="/contacts"
                    click={()=>onLinkClicked(false, 2)}>
                    CONTACTS
                    </NavItem>
                <NavItem 
                    link="/gallery"
                    click={()=>onLinkClicked(false, 3)}>
                    GALLERY
                    </NavItem>
            </ul>
        </nav>
    );
}

export default nav;