import React, { Component } from 'react';

import Project from './Project/Project';
import classes from './AllProjects.module.css';
import { play } from '../../../shared/timelines/pagesTimelines';
import { scrollY } from '../../../shared/utility';


class AllProjects extends Component {
    state = {
        deltaY: 0,
        maxDeltaY: 0,
        projActive: 0,
        projsHeight: 0,
        projsLength: 0,
        viewPHeight: 0,
    }
    
    componentDidMount () {
        let projsLength = this.props.projects.length,
            projsHeight = 164,
            viewPHeight = document.getElementById('allProjects').offsetHeight;
        
        this.setState({ 
            maxDeltaY: projsLength * projsHeight - viewPHeight,
            projsHeight: projsHeight,
            projsLength: projsLength,
            projActive: this.props.projActive,
            viewPHeight: viewPHeight
        });

        play('/all', `.${classes.AllProjects} > div`);
        
        this.props.onShowAllProjs();
        // console.log("[All Projects] compondentDidMount!!!");
    }

    componentDidUpdate () {      
        this.props.onLoadPage();  
        this.setState(prevState => {
            if (prevState.projActive !== this.props.projActive) {
                let newDeltaY = this.getNewDeltaY();

                return ({deltaY: newDeltaY, projActive: this.props.projActive});
            }
        })
    }

    getNewDeltaY = () => {
        const projOffsetHeight = (this.props.projActive + 1) * this.state.projsHeight;
        const projOffsetTop = this.props.projActive * this.state.projsHeight;
        let newDeltaY = this.state.deltaY;

        if (projOffsetTop - this.state.deltaY < 0) {
            newDeltaY = projOffsetHeight - this.state.projsHeight; 
        } else if (projOffsetHeight - this.state.viewPHeight > 0) {
            newDeltaY = projOffsetHeight - this.state.viewPHeight;
        }
        
        return newDeltaY;
    }
    
    handleScroll = (e) => {
        const deltaY = scrollY(e, this.state.deltaY, this.state.maxDeltaY);
        this.setState({deltaY: deltaY});
    }
    
    render () {
        const projects = Object.keys(this.props.projects)
            .map((projKey, index) => {
                let active = index === this.props.projActive ? true : false;
                return (
                    <Project 
                        key={projKey}
                        show={this.props.show}
                        index={index}
                        title={this.props.projects[projKey].title}
                        desc={this.props.projects[projKey].description}
                        image={this.props.projsImgs[projKey]}
                        active={active}
                        updateProjActive={this.props.updateProjActive}
                        setGetProj={this.props.setGetProj} />
                )
            });

        return (
            <div className={classes.AllProjects} 
                onWheel={(event) => this.handleScroll(event)}
                style={{top: "-" + this.state.deltaY +'px'}} >
                {projects}
            </div>
        );
    }
}


export default AllProjects;