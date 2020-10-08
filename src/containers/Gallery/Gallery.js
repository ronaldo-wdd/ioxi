import React, { Component } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { connect } from 'react-redux';

import classes from './Gallery.module.css';
import { scrollY } from '../../shared/utility';
import * as actions from '../../store/actions/';


class Gallery extends Component {
    state = {
        deltaX: 0,
        maxDeltaX: 0,

        images: [],
        collumn1: {
            ratio: 0,
            imgs: []
        },
        collumn2: {
            ratio: 0,
            imgs: []
        },
        loaded: false
    }
    
    componentDidMount () {
        let importAll = r =>  r.keys().map(r),
            imagesSrc = importAll(require.context('../../assents/images/gallery', false, /\.(png|jpe?g)$/)),
            images = this.getimgsRatio(imagesSrc);

        const gallery_scroll = document.getElementById("gallery_scroll"),
            row = gallery_scroll.querySelector("div"),
            maxDeltaX = gallery_scroll.offsetWidth - row.offsetWidth;
        
        this.setState({images: images, maxDeltaX: maxDeltaX});
        this.props.onSetCurrSection(3);
        // this.props.onSetPagesTransi(true, false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)
            ? true : false;
    }
    
    componentDidUpdate () {
        this.createCollumns();
        this.state.deltaX !== 0
            ? this.props.onSetPagesTransi(false, false)
            : this.props.onSetPagesTransi(true, false);
    }

    getimgsRatio = imagesSrc => {
        const imagesRatio = [];

        for (let i=0; i < imagesSrc.length; i++) {
            const image = new Image();
            image.src = imagesSrc[i];
            image.onload = () => imagesRatio.push({
                id: i,
                src: imagesSrc[i],
                x_ratio: image.naturalWidth / image.naturalHeight,
                y_ratio: image.naturalHeight / image.naturalWidth
            });
        }
        
        return imagesRatio;
    }

    createCollumns = () => {
        let collumn1_ratio = 0,
            collumn2_ratio = 0,
            collumn1_imgs = [],
            collumn2_imgs = [];
        
        for (let i = 0; i < this.state.images.length; i++) {
            if (collumn1_ratio <= collumn2_ratio) {
                collumn1_ratio += this.state.images[i].x_ratio;
                collumn1_imgs.push(this.state.images[i].src);
            } else {
                collumn2_ratio += this.state.images[i].x_ratio;
                collumn2_imgs.push(this.state.images[i].src);
            }
        }

        this.setState({
            collumn1: {
                ratio: collumn1_ratio,
                imgs: collumn1_imgs
            },
            collumn2: {
                ratio: collumn2_ratio,
                imgs: collumn2_imgs
            },
            loaded: true
        })
    }

    handleScroll = e => {
        // const deltaX = scrollY(e, this.state.deltaX, this.state.maxDeltaX);
        const deltaX = e.type === "scroll"
            ? document.getElementById("gallery_scroll").scrollLeft
            : scrollY(e, this.state.deltaX, this.state.maxDeltaX);

        this.setState({deltaX: deltaX});
    }
    
    render () {
        let collumn1 = this.state.loaded ? this.state.collumn1.imgs.map((img, index) => {
            return (
                <CSSTransition key={index} timeout={300}>
                    <img className="img" src={img} alt="a" /> 
                </CSSTransition>
            );
        }) : [];
        let collumn2 = this.state.loaded ? this.state.collumn2.imgs.map((img, index) => {
            return (
                <CSSTransition key={index} timeout={300}>
                    <img className="img" src={img} alt="a" /> 
                </CSSTransition>
            );
        }) : [];

        let gallery_classes = [classes.Gallery];
        if (this.state.deltaX > 0) gallery_classes.push(classes._X);
        if (this.state.deltaX !== this.state.maxDeltaX) gallery_classes.push(classes.X_);
        
        
        return (
            <div className={gallery_classes.join(" ")} 
                id="gallery_scroll"
                onScroll={ event => this.handleScroll(event) } >
                <div className={classes.Row}
                    onWheel={event => this.handleScroll(event)}
                    style={{transform: `translateX(-${this.state.deltaX}px)`}} >
                    <TransitionGroup component="div" className="collumn1">
                        {collumn1}
                    </TransitionGroup >
                    <TransitionGroup component="div" className="collumn2">
                        {collumn2}
                    </TransitionGroup>
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

export default connect(null, mapDispatchToProps)(Gallery);