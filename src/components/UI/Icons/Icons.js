import React from 'react';
// import ReactTextTransition, { presets } from 'react-text-transition';

import classes from './Icons.module.css';

const fbCont = ["FB", "Facebook", 0],
    igCont = ["IG", "Instagram", 0],
    inCont = ["IN", "Linkedin", 0];

// console.log(fbCont);
    
const icons = (props) => {
    switch(props.type) {
        case "fb": return (
            <div className={classes.Icon}>
                <a href="https://facebook.com" target="blank"
                    // onMouseOver={()=>{return fbCont[2]=1}} 
                    >
                    {fbCont[fbCont[2]]}</a>
            </div>
        );
        case "ig":  return (
            <div className={classes.Icon}>
                <a href="https://instagram.com" target="blank">{igCont[0]}</a>
            </div>
        );
        case "in": return (
            <div className={classes.Icon}>
                <a href="https://linkedin.com" target="blank">{inCont[0]}</a>
            </div>
        );
        default: return (
            <div className={classes.Icon}>
                <a href="https://facebook.com" target="blank">{fbCont[0]}</a>
            </div>
        )
    }
}

export default icons;