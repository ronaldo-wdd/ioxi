import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './About.module.css';
import profileImg from '../../assents/images/profile.jpg';
import Contacts from './Contacts/Contacts';
import { scrollY } from '../../shared/utility';
import * as actions from '../../store/actions/';


let contact = null;

class About extends Component {
    state = {
        deltaY: 0,
        maxDeltaY: 10,
        contactSection: false
    }
    
    componentDidMount () {
        contact = document.getElementById("contacts");  
        const about = document.getElementById("about"),
            text = about.querySelector("#about_scroll"),
            scroll = text.querySelector("div");

        // this.props.history.location.pathname = "/contacts" 
        //     && this.setState({contactSection: true});

        setTimeout(()=> {
            let maxDeltaY = scroll.offsetHeight - text.offsetHeight > 10
                ? scroll.offsetHeight - text.offsetHeight
                : about.scrollHeight - about.clientHeight;      
                
            // this.props.history.location.pathname = "/contacts"
            //     ? this.setState({ maxDeltaY: maxDeltaY, contactSection: true })
            //     : this.setState({ maxDeltaY: maxDeltaY });
        
            this.setState({ maxDeltaY: maxDeltaY, contactSection: this.props.contactSection });
        }, 500);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)) 
            // && this.props.contactSection == false
            ? true : false;
    }
    
    componentDidUpdate () {
        this.state.deltaY !== 0 
            ? this.props.onSetPagesTransi(false, false)
            : this.props.onSetPagesTransi(true, false);

        // this.props.history.location.pathname = "/contacts" 
        //     && this.setState({deltaY: this.state.maxDeltaY}); 
        
        // (!this.state.contactSection && this.props.history.location.pathname == "/contacts")
        //     && this.goToContactSection();

        this.state.maxDeltaY - this.state.deltaY < 10 && this.props.onSetPagesTransi(false, true);

        this.state.deltaY >= this.state.maxDeltaY - contact.offsetHeight
            ? this.setCurrSection(2)
            : this.setCurrSection(1);
    }

    handleScroll = e => {
        const deltaY = e.type === "wheel"
            ? scrollY(e, this.state.deltaY, this.state.maxDeltaY)
            : e.target.scrollTop;
        this.setState({deltaY: deltaY});
    }

    setCurrSection = section => {
        const sections = ["/about", "/contacts"];
        
        (section !== this.props.currSection && !this.state.contactSection && this.state.maxDeltaY > 10)
            ? this.props.onSetCurrSection(section) 
                && this.props.history.replace(sections[section-1])
            : this.state.contactSection && this.contactSection();
    }
    
    contactSection = () => {
        this.setState({deltaY: this.state.maxDeltaY, contactSection: false});
        this.props.onSetCurrSection(2);
    }
    
    render () { 
        return (
            <div id="about"
                className={classes.About} 
                onWheel={event => this.handleScroll(event)}
                onScroll={event => this.handleScroll(event)} >
                <div className={classes.Profile}>
                    <div id="img" className={classes.Img}
                        style={{
                            background: `url(${profileImg}) no-repeat center`,
                            backgroundSize: 'cover'
                        }} /> 
                    <h1>Waldemar Figueiredo</h1>
                </div>
                <div id="about_scroll" className={classes.Text}>
                    <div 
                        className={classes.Scroll}
                        style={{transform: `translateY(-${this.state.deltaY}px)`}} >
                        <h1 className="titlePc">IOXI Studio</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut.</p>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>

                        <Contacts />
                    </div>
                </div>
            </div>
        );
    }
}

//
const mapDispatchToProps = dispatch => {
    return {
        onSetPagesTransi: (prev, next) => dispatch(actions.setPagesTransition(prev, next)),
        onSetCurrSection: section => dispatch(actions.setCurrSection(section))
    }
}

const mapStateToProps = state => {
    return {
        currSection: state.navigation.currSection
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);