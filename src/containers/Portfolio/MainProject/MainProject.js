import React, { Component } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import classes from './MainProject.module.css';
import Infos from './Infos/Infos';
import Nav from '../../../components/Navigation/Header/Nav/Nav';
import './MainProject.css';

var posInitial,
    posX1 = 0, 
    posX2 = 0;

class MainProj extends Component {
    state = {
        displayedImgs: [],
        lastKey: 0,
        projActive: 0,
        timeout: 700,
        transMoveX: 0,
        animating: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)
            ? true : false;
    }
    
    UNSAFE_componentWillUpdate () {
        this.setState({projActive: this.props.projActive});
        // console.log('[MainProject.js] componentWillUpdate');
    }
    
    componentDidUpdate() {
        this.setState(prevState => {
            if (prevState.displayedImgs.length === 0 || (prevState.projActive !== this.props.projActive && this.props.getSelectedProj)) {  
                this.props.resetGetProj();

                const projActive = this.props.projActive,
                    displayedImgs = [];
                let lastKey = prevState.lastKey;
                
                for (let i = 0; i < 3; i++) {
                    lastKey ++;
                    displayedImgs.push(this.getNewEl(projActive + (i-1), lastKey));
                }

                return { displayedImgs: displayedImgs, lastKey: lastKey }
            }
        });

        if (this.props.getNextProj && !this.props.showP && !this.props.showAP) {
            this.props.resetGetProj();
            this.onNextProj();
        }

        if (this.props.getSelectedProj) {
            return;
        }
        // console.log('[MainProject.js] ComponentDidUpdate!');
    }

    // componentDidMount () {
    //     console.log('[MainProject.js] ComponentDidMount!');
    // }
    
    onNextProj = () => {
        if (this.state.animating) return;
        
        const el = this.props.projActive;
        const key = this.state.lastKey + 1;
        const newEl = this.getNewEl(el + 2, key);

        this.props.updateProjActive(el + 1);

        this.setState(prevState => {  
            const newDispImg = prevState.displayedImgs;
            newDispImg.shift();
            newDispImg.push(newEl);

            return {
                displayedImgs: newDispImg,
                lastKey: key,
                animating: true
            }
        });
    }

    onPrevProj = () => {
        if (this.state.animating) return;
        
        const el = this.props.projActive;
        const key = this.state.lastKey + 1;
        const newEl = this.getNewEl(el - 2, key);

        this.props.updateProjActive(el - 1, key);
        
        this.setState(prevState => {
            const newDispImg = prevState.displayedImgs;
            newDispImg.pop();
            newDispImg.unshift(newEl);

            return {
                displayedImgs: newDispImg,
                lastKey: key,
                animating: true
            }
        });
    }

    getNewEl = (el, key) => {
        // const key = this.state.lastKey + 1;
        
        switch (el) {
            case -2: return {
                key: key,
                path: this.props.projsImgs[this.props.projsImgs.length-2] };
            case -1: return {
                key: key,
                path: this.props.projsImgs[this.props.projsImgs.length-1] };
            case this.props.projsImgs.length + 1: return {
                key: key,
                path: this.props.projsImgs[1] }; 
            case this.props.projsImgs.length: return {
                key: key,
                path: this.props.projsImgs[0] };
            default: return {
                key: key,
                path: this.props.projsImgs[el]
            }
        }
    }

    onDragStart = (translateX, e) => {
        this.props.onClearInterval();
        e = e || window.event;
        // e.preventDefault(); 
        posInitial = translateX;

        if (e.type === 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = this.onDragEnd(translateX);
            document.onmousemove = this.onDragAction();
        }
    }

    onDragAction = (e) => {
        e = e || window.event;
    
        if (e.type === 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }

        this.setState(prevState => {
            return { transMoveX: prevState.transMoveX - posX2 }
        });
    }

    onDragEnd = (translateX) => {
        if (translateX - posInitial < 0) {
            this.onNextProj();
        } else if (translateX - posInitial > 0) {
            this.onPrevProj();
        }

        this.setState({ transMoveX: 0});

        document.onmouseup = null;
        document.onmousemove = null;
    }

    onAnimationEnd = () => {
        this.setState({animating: false});
    }
    

    render () {
        const navClasses = [classes.BottomNav];
        if (this.props.showAP || this.props.showP)
            navClasses.push(classes.Hidden);

        const displayedImgs = Object.keys(this.state.displayedImgs).map( (key,index) => {
            const img = this.state.displayedImgs[key];
            return (
                <CSSTransition key={img.key} className={classes.Slide} classNames="slide" timeout={this.state.timeout} >
                    <div style={{
                        transition: "all .7s",
                        // background: `url('${img.path}') no-repeat center`,
                        backgroundImage: `url(${img.path})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        maxWidth: index === 1 ? "100%" : "50%",
                        opacity: index === 1 ? 1 : 0
                    }}>
                        {/* <img src={img.path} alt="" /> */}
                    </div>
                </CSSTransition>
            )
        });

        let infos = this.props.loaded
            ? (<Infos 
                projects={this.props.projects}
                projActive={this.props.projActive}
                onNextProj={this.onNextProj}
                onPrevProj={this.onPrevProj}
                onDragStart={(transl, event) => this.onDragStart(transl, event)}
                onDragAction={(event) => this.onDragAction(event)}
                onDragEnd={(transl) => this.onDragEnd(transl)}
                transMoveX={this.state.transMoveX}
                shifting={this.props.shifting}
                onAnimationEnd={() => this.onAnimationEnd()}
                onShowProject={this.props.onShowProject}
                showP={this.props.showP} />)
            : null;
        
        return (
            <div className={classes.MainProject} >
                <TransitionGroup component="div" className={classes.MainImg}>
                    {displayedImgs}
                </TransitionGroup>

                <div className={navClasses.join(' ')}>
                    <Nav 
                        show={this.props.showAP}
                        onSetShowAllProjs={this.props.onSetShowAllProjs}
                        onSetCurrSection={this.props.onSetCurrSection} />
                </div>

                {infos}
            </div>
        )
    }
}

export default MainProj;