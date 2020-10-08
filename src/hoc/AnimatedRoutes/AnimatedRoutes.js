import React from 'react';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Route, Switch } from 'react-router-dom';

import Portfolio from '../../containers/Portfolio/Portfolio';
import About from '../../containers/About/About';
import Gallery from '../../containers/Gallery/Gallery';
import { play, exit } from '../../shared/timelines/pagesTimelines';


const AnimatedRoutes = (props) => {
    let key = props.location.pathname;
    let subPath = false;

    if (key === "/all" || key === "/project") {
        key = "/";
        subPath = true;
    }
    else if (key === "/contacts") {
        key = "/about";
        // subPath = true;
    }
    
    return (
        <TransitionGroup component={null} className="alll" >
            <Transition
                key={key}
                appear={true}
                onEnter={ node => !subPath && play(props.location.pathname, node) }
                onExit={ node => !subPath && exit(node) }
                timeout={{enter: 350, exit: 350}} >
                <Switch>
                    <Route path="/contacts" render={props => <About {...props} contactSection={true} />} />
                    {/* <Route path="/contacts" component={About} /> */}
                    <Route path="/about" component={About} />
                    <Route path="/gallery" component={Gallery} />
                    <Route path="/" component={Portfolio} />
                </Switch>
            </Transition>
        </TransitionGroup>
    );
}

export default AnimatedRoutes;