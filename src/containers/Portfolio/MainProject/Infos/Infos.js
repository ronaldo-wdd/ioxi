import React from 'react';
// import ReactTextTransition, { presets } from 'react-text-transition';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import classes from './Infos.module.css';
import Controlls from './Controlls/Controlls';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import { play, exit } from '../../../../shared/timelines/timelines';


const infos = (props) => {
    const projects = [...props.projects],
        lastClone = [...projects].splice(0, 1),
        firstClone = [...projects].splice(projects.length - 1, 1);
    let projectsM = [
        ...firstClone, 
        ...projects, 
        ...lastClone
    ];
    
    const projsContMobile = Object.keys(projectsM).map(key => {
        return (
            <div key={key} className={classes.Cont}>
                <h1>{projectsM[key].title}</h1>
                <p>{projectsM[key].description}</p>
            </div>
        );
    });

    const projs = Object.keys(props.projects).map((key, index) => {
        return {
            title: props.projects[key].title,
            desc: props.projects[key].description,
            key: index
        }
    });

    const transitionStyles = {
        entering: { display: 'none' }, 
        entered: { display: 'block' },
        exiting: { display: 'block' },
        exited: { display: 'none' }
    };

    const originalCont = {
        title: projs[props.projActive].title,
        desc: projs[props.projActive].desc
    }
    
    const projsContPc = [
        <Transition
            key={projs[props.projActive].key}
            timeout={800}
            appear={true}
            unmountOnExit
            mountOnEnter
            onEntered={() => play('.' + classes.Pc, originalCont, props.onAnimationEnd)}
            onExit={() => exit('.' + classes.Pc)} >
            {state => (
                <Aux>
                    <h1 className={state == 'entered' ? 'active' : 'exiting'} 
                        style={{...transitionStyles[state]}} >
                        {projs[props.projActive].title}</h1>
                    <p className={state == 'entered' ? 'active' : 'exiting'} 
                        style={{...transitionStyles[state]}} >
                        {projs[props.projActive].desc}</p>
                </Aux>
            )}
        </Transition> 
    ];

    let index = props.shifting ? props.projActive + 1 : 0,
        time = props.shifting ? 300 : 0,
        translateX = index * -100 + props.transMoveX;

    let style = [classes.Infos];
    props.showP && style.push(classes.Hidden);
    
    
    return (
        <div className={style.join(' ')}>
            <div className={classes.Mobile}>
                <div style={{
                        transition: `all ${time}ms ease-out`,
                        transform: `translateX(${translateX}%)`
                    }}
                    onTouchStart={(event) => props.onDragStart(translateX, event)}
                    onTouchEnd={() => props.onDragEnd(translateX)}
                    onTouchMove={(event) => props.onDragAction(event)} >
                    {projsContMobile}
                </div>
            </div>
                
            <div className={classes.Pc}>
                <TransitionGroup component={null} >
                    {projsContPc}
                </TransitionGroup>
            </div>
            
            <Controlls 
                onNextProj={props.onNextProj}
                onPrevProj={props.onPrevProj}
                onShowProject={props.onShowProject} />
        </div>
    );
}

export default infos;