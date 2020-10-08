import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Project.module.css';
import CloseBtn from '../../../components/UI/Button/Button';
import Scroll from '../../../components/Navigation/Scroll/Scroll';
import { imagesSrc } from '../../../shared/utility';
import { play, exit } from '../../../shared/timelines/pagesTimelines';
import { scrollY } from '../../../shared/utility';
import Images from './Images/Images';


let images = [];

class Project extends Component {
    state = {
        deltaY: 0,
        maxDeltaY: 0,
        newDelta: 0,
        maxNewDelta: 0,
        viewPortH: 0
    }

    componentDidMount () {
        images = this.props.projs[this.props.projActive].images;
        const projHeight = document.getElementById("project").offsetHeight,
            vpH = window.innerHeight,
            imgsNum = (images.length - 1) * vpH;

        this.setState({maxDeltaY: projHeight - 50, viewPortH: vpH, maxNewDelta: imgsNum});
        play("/project", "."+classes.Project);
    }

    handleScroll = (e) => {
        e.persist(); //SyntheticEvent
        
        const delta = e.deltaY;
        
        this.state.deltaY === this.state.maxDeltaY &&
            this.setState(prevState => {
                const d = Math.min(prevState.newDelta + delta, this.state.maxNewDelta);
                return { newDelta: d }
            });

        if (this.state.newDelta > 0) return;
        
        const deltaY = scrollY(e, this.state.deltaY, this.state.maxDeltaY);
        this.setState({deltaY: deltaY});
    }

    onExit = () => {
        exit("."+classes.Project);
        setTimeout( this.props.close(), 100);
        // setTimeout( this.props.close(), 700);
    }


    render () {
        const mainImage = imagesSrc([this.props.project.mainImg]);
        
        return (
            <div className={classes.Project}
                onWheel={event => this.handleScroll(event)}>
                <div id="project"
                    className={classes.Container}
                    style={{top: "-" + this.state.deltaY + "px"}} >
                    <div className={classes.Main}>
                        <div id="img" className={classes.Img}
                            style={{
                                // background: `url(${mainImage}) no-repeat center`,
                                backgroundImage: `url(${mainImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}>
                            {/* <img src={image} /> */}
                        </div>
                        <div id="txt" className={classes.Text}>
                            <h1>{this.props.project.title}</h1>
                            <p>{this.props.project.description}</p>
                        </div>
                    </div>
                    
                    <div className={classes.Images}>
                        <Images projImgs = {images}
                            deltaY = {this.state.newDelta}
                            vpH = {this.state.viewPortH} />
                    </div>
                </div>
                <div className={classes.Btn}>
                    <CloseBtn type="close" click={() => this.onExit}/>
                </div>
                <div className={classes.Scroll}>
                    <Scroll txt="SCROLL DOWN"
                        scrollH = {this.state.maxDeltaY + this.state.maxNewDelta}
                        scrollP = {this.state.deltaY + this.state.newDelta} />
                </div>
            </div>
        );
    }
}


//
const mapStateToProps = state => {
    return {
        projs: state.projects.projects
    }
}

export default connect(mapStateToProps)(Project);