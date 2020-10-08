import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo/Logo';
import Navigation from '../Scroll/Scroll';
import classes from './SideNav.module.css';
import Icon from '../../UI/Icons/Icons';


const sideNav = (props) => {
    const navClasses = [classes.Nav];
    props.showAP && navClasses.push(classes.Small);
    props.showP && navClasses.push(classes.Hidden);

    const nWidth = props.scrollP > 0 && props.scrollDown
        ? 100/450 * Math.abs(props.scrollP)
        : 0;
    const pWidth = props.scrollP < 0 && props.scrollUp
        ? 100/450 * Math.abs(props.scrollP)
        : 0;
    const opa = props.scrollP > 100 && props.scrollDown
        || props.scrollP < -100 && props.scrollUp
        || props.section > 1 ? 1 : 0;
    
    return (
        <div className={classes.SideNav}>
            <Logo />
            <div className={navClasses.join(' ')}>
                <div className={classes.WhiteSpace}></div>
                <div className={classes.SocialMedias}>
                    <Icon type="fb" />
                    <Icon type="ig" />
                </div>
                <Navigation section={props.section} opacity={opa} >
                    <span style={{width: pWidth + "%"}}/>
                    <span style={{width: nWidth + "%"}}/>
                </Navigation>
            </div>
        </div>
    )
}

//
const mapStateToProps = state => {
    return {
        showAP: state.navigation.showAllProjects,
        showP: state.navigation.showProject,
        section: state.navigation.currSection,
        
        scrollP: state.navigation.scrollPosition,
        scrollDown: state.navigation.pagesTransition.next,
        scrollUp: state.navigation.pagesTransition.prev
    }
}

export default connect(mapStateToProps)(sideNav);