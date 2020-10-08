import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav/Nav';
import classes from './Header.module.css';
import * as actions from '../../../store/actions/';

class Header extends Component {
    state = {
        showMobileNav: false
    }

    handleNavClick = () => {
        if (this.props.showP || this.props.showAP) {
            this.props.onSetShowProj(false);
            this.props.onSetShowAllProjs(false);
            this.props.history.goBack();
        }
        else {
            this.setState(prevState => {
                return { showMobileNav: !prevState.showMobileNav }
            });
        }
    }
    
    render() {        
        const headerClasses = [classes.Header];

        (!this.props.show && this.props.currSection === 0) && headerClasses.push(classes.Hidden);
        this.state.showMobileNav && headerClasses.push(classes.Active);
        this.props.showP && headerClasses.push(classes.OnShowAllProjs);
        this.props.showAP && headerClasses.push(classes.OnShowAllProjs);

        return (
            <header className={headerClasses.join(' ')} >
                <div className={classes.Empty} />
                <Nav 
                    show={this.props.show}
                    onSetShowAllProjs={show => this.props.onSetShowAllProjs(show)}
                    onSetCurrSection={section => this.props.onSetCurrSection(section)}
                    clicked={()=> this.handleNavClick()} />
                <div 
                    className={classes.NavBtn}
                    onClick={() => this.handleNavClick()} >
                    <div></div>
                </div>
            </header>
        );
    }
}


//
const mapStateToProps = state => {
    return {
        show: state.navigation.showAllProjects,
        showP: state.navigation.showProject,
        showAP: state.navigation.showAllProjects,
        currSection: state.navigation.currSection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetShowAllProjs: show => dispatch(actions.setShowAllProjs(show)),
        onSetCurrSection: section => dispatch(actions.setCurrSection(section)),
        onSetShowProj: show => dispatch(actions.setShowProj(show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);