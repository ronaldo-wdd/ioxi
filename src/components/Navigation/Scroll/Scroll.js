import React from 'react';

import classes from './Scroll.module.css';

const sections = [ 'SCROLL DOWN', 'ABOUT', 'CONTACTS', 'GALLERY'];


const Navigation = (props) => {
    let SP = props.scrollP || props.section * 20,
        SH = props.scrollH || 60,
        txt = props.txt || sections[props.section];
    const position = SP / SH * 80 - (SP / SH * 20);

    return (
        <div className={classes.Navigation}
            style={{opacity: props.opacity}}>
            <p>{txt}</p>
            <div className={classes.Scrollbar}>
                <div style={{right: position + 'px'}} />
                {props.children}
            </div>
        </div>
    );
}


export default Navigation;