import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import logo from './logo.svg'; // <img src={logo} />
import LogoSvg from './LogoSvg';
import classes from './Logo.module.css';

class Logo extends Component {
    render () {
        const allClasses = [classes.Logo];
        if (this.props.showText)
            allClasses.push(classes.Header);
        
        return (
            <div className={allClasses.join(' ')}>
                <NavLink to="/">
                    <LogoSvg showText={!this.props.showText}/>
                </NavLink>
            </div>
        )
    }
}

//
const mapStateToProps = state => {
    return {
        showText: state.navigation.showAllProjects
    }
}

export default connect(mapStateToProps)(Logo);