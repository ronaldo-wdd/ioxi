import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import { AnimatedRoute } from 'react-router-transition';

import classes from './Portfolio.module.css';
import AllProjects from './AllProjects/AllProjects';
import MainProject from './MainProject/MainProject';
import Project from './Project/Project';
import * as actions from '../../store/actions/';

let projActiveInterval;


class Portfolio extends Component {
  state = {
    projActive: 0,
    getSelectedProj: false,
    getNextProj: false,
    loaded: false,
    shifting: true
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.onSetShowAllProjs(false);
      // this.props.onSetShowProj(false);
      this.props.onSetCurrSection(0);
    }

    this.props.showP || this.props.showAP
      ? this.props.onSetPagesTransi(false, false)
      : this.props.onSetPagesTransi(false, true);
    // console.log("[Portfolio.js] componentDidUpdate!!");
  }

  componentDidMount () {
      projActiveInterval = setInterval(() => {
        this.setGetProj(false, true);
      }, 7000);

      this.props.onFetchProjs();
      this.props.onSetCurrSection(0);
      // console.log("[Portfolio.js] componentDidMount!!");
  }

  updateProjActive (proj) {    
    if (proj > this.props.projsMainImg.length-1) proj = 0;
      else if (proj < 0) proj = this.props.projsMainImg.length-1;
    this.setState({shifting: true, projActive: proj});

    setTimeout(() => {
      if (this.state.projActive === this.props.projects.length - 1)
        this.setState({shifting: false});
    }, 400);
    
    this.onSetInterval();
  }

  setGetProj = (getSelectedP = false, getNextP = false) => {
    this.setState({getSelectedProj: getSelectedP, getNextProj: getNextP});
  }

  onShowProject = () => {
    clearInterval(projActiveInterval);
    this.props.onSetShowProj(true);
    this.props.history.push('/project');
  }
  onCloseProject = () => {
    this.props.onSetShowProj(false);
    this.props.history.goBack();
  }
  
  onSetInterval = () => {
    clearInterval(projActiveInterval);
    projActiveInterval = setInterval(() => {
      this.setGetProj(false, true)
    }, 7000);
  };
  onClearInterval = () => clearInterval(projActiveInterval);
  
  render() {
    let style = this.props.showP 
      ? { height: "100vh", marginTop: "0px" } 
      : { marginTop: '55px' };

    let loaded = this.props.projects !== undefined 
      ? this.props.projects.length > 0 ? true : false
      : false;
    
    return (
      <div style={style} className={classes.Portfolio}>
        <div className={classes.MainProject}>
          { loaded && <MainProject 
            updateProjActive = { (proj) => this.updateProjActive(proj) }
            showAP = {this.props.showAP}
            showP = {this.props.showP}
            projActive = {this.state.projActive}
            loaded = {loaded}
            shifting = {this.state.shifting}
            projects = {this.props.projects}
            projsImgs = {this.props.projsMainImg}
            getNextProj = {this.state.getNextProj}
            getSelectedProj = {this.state.getSelectedProj}
            resetGetProj = {this.setGetProj}
            onSetShowAllProjs = {show => this.props.onSetShowAllProjs(show)}
            onShowProject = {() => this.onShowProject}
            onSetCurrSection = {section => this.props.onSetCurrSection(section)}
            onClearInterval = {() => this.onClearInterval()} />}
        </div>

        <div id="allProjects" className={classes.AllProjects}>
          <Route path="/all" >
            { loaded &&
              <AllProjects 
                show={this.props.showAP} 
                onShowAllProjs={() => this.onClearInterval()}
                projects={this.props.projects}
                projActive={this.state.projActive}
                projsImgs={this.props.projsMainImg}
                updateProjActive={ (proj)=> this.updateProjActive(proj) }
                setGetProj={(getSelectedP, getNextP) => this.setGetProj(getSelectedP, getNextP)}
                onLoadPage={() => this.props.onSetShowAllProjs(true)} />
            }
          </Route>
        </div>

        <Route path="/project">
          { loaded &&
            <Project 
              close={() => this.onCloseProject}
              project={this.props.projects[this.state.projActive]}
              projActive={this.state.projActive} />
          }
        </Route>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAP: state.navigation.showAllProjects,
    showP: state.navigation.showProject,
    projects: state.projects.projects,
    projsMainImg: state.projects.projsMainImg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetShowAllProjs: show => dispatch(actions.setShowAllProjs(show)),
    onSetShowProj: show => dispatch(actions.setShowProj(show)),
    onSetCurrSection: section => dispatch(actions.setCurrSection(section)),
    onFetchProjs: () => dispatch(actions.fetchProjects()),
    onSetPagesTransi: (prev, next) => dispatch(actions.setPagesTransition(prev, next))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);