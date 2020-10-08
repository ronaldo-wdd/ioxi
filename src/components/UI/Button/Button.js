import React from 'react';

import classes from './Button.module.css';
import { CloseBtn, NextBtn, PrevBtn } from './ButtonSvg/ButtonsSvg';
import { SplitText } from '../../../shared/splittext/splittext';

const allClasses = [classes.Button];

const Button = (props) => {
    switch (props.type) {
        case 'next': 
            return (
                <div className={allClasses.join(' ')} onClick={props.click}>
                    {/* <img alt="" src={nextIcon} /> */}
                    <NextBtn active={false}/>
                </div> );

        case 'prev': 
            return (
                <div className={allClasses.join(' ')} onClick={props.click}>
                    {/* <img alt="" src={prevIcon} /> */}
                    <PrevBtn active={false}/>
                </div> );

        case 'close': 
            return (
                <div className={allClasses.join(' ')} onClick={props.click()}>
                    {/* <img alt="" src={closeIcon} /> */}
                    <CloseBtn active={false}/>
                </div> );

        default:
            // const text = new SplitText(props.text, {type:"chars,words,lines"});
            // console.log(text);

            return (
            <div className={allClasses.join(' ')} onClick={props.click()}>
                <p>{props.text}</p>
            </div> )
    }
}

export default Button;