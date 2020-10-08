import React from 'react';
import  { connect } from 'react-redux';


const pageTransition = (props) => {
    const opa = (props.scrollP > 0 && props.scrollDown) || (props.scrollP < 0 && props.scrollUp)
        ? 1/450 * Math.abs(props.scrollP)
        : 0;
    
    return (
        <div style = {{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#232323',
            zIndex: '999',
            pointerEvents: 'none',
            opacity: opa,
            transition: 'all .3s'
        }} />
    );
}

//
const mapStateToProps = state  => {
    return {
        scrollP: state.navigation.scrollPosition,
        scrollDown: state.navigation.pagesTransition.next,
        scrollUp: state.navigation.pagesTransition.prev
    }
}

export default connect(mapStateToProps)(pageTransition);