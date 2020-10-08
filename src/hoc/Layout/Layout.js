import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './Layout.module.css';
import * as actions from '../../store/actions/';


var posX1, posX2,
    links = [
    '/',
    '/about',
    '/contacts',
    '/gallery'
];
let tOut = null, pTrans = null, pagesTrans = true;


class Layout extends Component {
    handleScroll = e => {
        switch (e.type) {
            case "wheel": 
                this.props.scrollP > -450 && this.props.scrollP < 450
                    ? this.handleOpacity(e.deltaY, true)
                    : this.handlePageTransition(); break
            case "touchstart": posX1 = e.touches[0].clientY; break
            case "touchmove": 
                if (this.props.scrollP > -450 && this.props.scrollP < 450) {
                    posX2 = posX1 - e.touches[0].clientY;
                    posX1 = e.touches[0].clientY;
                    (posX2 > 2 || posX2 < -2) && this.handleOpacity(posX2*4, false);
                } else this.handlePageTransition(); break
            case "touchend": setTimeout(()=> this.resetOpacity(), 1000); break
            default: this.resetOpacity();
        }
    }

    handleOpacity = (deltaY, resetOpacity) => {
        clearTimeout(tOut);
        pagesTrans && this.props.onSetScrollState(deltaY);
        resetOpacity && (tOut = setTimeout(() => this.resetOpacity(), 1000));
    }
    resetOpacity = () => this.props.onSetScrollState(0);

    handlePageTransition = () => {
        if (!pagesTrans || (!this.props.nextPage && this.props.scrollP > 0) || (!this.props.prevPage && this.props.scrollP < 0)) 
            return;

        pagesTrans = false;
        clearTimeout(pTrans);
        
        if (this.props.scrollP > 0) {
            setTimeout( () => {
                this.props.history.push(links[this.props.section + 1]);
                // this.props.onSetCurrSection(this.props.section + 1);
            }, 900);
        } else {
            setTimeout( () => {
                this.props.history.push(links[this.props.section - 1]);
                // this.props.onSetCurrSection(this.props.section - 1);
            }, 900);
        }

        pTrans = setTimeout(()=> pagesTrans = true, 1000);
    }
    
    render () {
        return (
            <main className={classes.Container} 
                onWheel={event => this.handleScroll(event)}
                onTouchStart={event => this.handleScroll(event)}
                onTouchMove={event => this.handleScroll(event)}
                onTouchEnd={event => this.handleScroll(event)} >
                {this.props.children}
            </main>
        );
    }
}

//
const mapStateToProps = state  => {
    return {
        nextPage: state.navigation.pagesTransition.next,
        prevPage: state.navigation.pagesTransition.prev,
        scrollP: state.navigation.scrollPosition,
        section: state.navigation.currSection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetScrollState: scroll => dispatch(actions.setScrollPosition(scroll)),
        onSetCurrSection: section => dispatch(actions.setCurrSection(section))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));