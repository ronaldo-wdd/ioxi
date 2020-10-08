import React from 'react';
// import CSSTransition from 'react-transition-group/CSSTransition';
// import TransitionGroup from 'react-transition-group/TransitionGroup';

import classes from './Project.module.css';

const project = (props) => {
    const projClasses = [classes.Project];
    if (props.active) projClasses.push(classes.Active);

    const onClicked = (proj) => {
        props.updateProjActive(proj);
        props.setGetProj(true);
    }
    
    return (
        <div className={projClasses.join(' ')}
            onClick={() => onClicked(props.index)} >
            <div className={classes.Img}
                style={{
                    background: `url('${props.image}') no-repeat center`, 
                    backgroundSize: 'cover'}} />
                {/* <img src={props.image} alt="" /> */}
            <div className={classes.Title}>
                <h2>{props.title}</h2>
            </div>
        </div>
    )
}

export default project;