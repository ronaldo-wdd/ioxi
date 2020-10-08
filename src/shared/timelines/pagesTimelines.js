import { Power1, Expo } from 'gsap';
import gsap from 'gsap';

import { SplitText } from '../splittext/splittext';


export const play = (pathname, node) => {
    let timeline;

    switch (pathname) {
        case "/project": timeline = getProjectTimeline(node); break
        case "/all": timeline = getAllProjsTimeline(node); break
        case "/about": timeline = getAboutTimeline(node); break
        case "/contacts": timeline = getAboutTimeline(node); break
        case "/gallery": timeline = getGalleryTimeline(node); break
        default: timeline = getHomeTimeline(node);
    }

    window
        .loadPromise
        .then(() => requestAnimationFrame(() => timeline.play()));
}

export const exit = ( node ) => {
    let timeline;

    // if (pathname === "/project") timeline = getProjectExitTimeline(node);
    timeline = gsap.timeline({paused: true});
    timeline.to(node, 0.15, { autoAlpha: 0, ease: Power1.easeOut });
    timeline.play();
}

//
const getHomeTimeline = (node) => {
    const timeline = gsap.timeline({paused: true});

    // timeline.to(`${node}`, { opacity: 0 });

    return timeline;
}

//
const getProjectTimeline = (node) => {
    var timeline = gsap.timeline(),
        splitTitle = new SplitText(`${node} #txt h1`, {type:"lines,words"}),
        splitWords = splitTitle.words;
        
    timeline
        .to(`${node} #project`, 1, { top: -120, opacity: 1, ease: Power1.easeOut })
        .from(splitWords, 1, { opacity: 0, y: '100%' }, "-=0.4")
        // .from(`${node} #txt p`, 1, { 
        //     // scrollTrigger: {
        //     //     trigger: `${node} #txt p`,
        //     //     markers: true
        //     // }, 
        //     opacity: 0, y: '100%' }, "-=0.4")
        .from(`${node} #img`, 1.5, { width: 0, ease: Expo.easeOut }, "-=1.4");
    return timeline;
}

//
const getAllProjsTimeline = (node) => {
    var timeline = gsap.timeline({paused: true}),
        splitText = new SplitText(`${node} h2`, {type: 'lines,words'}),
        splitWords = splitText.words;

    timeline
        .staggerTo(node, 2, { opacity: 1, y: 0, ease: Expo.easeOut }, 0.2)
        .from(splitWords, 2, { y: '100%', ease: Expo.easeOut }, "<");
    
    return timeline;
}

//
const getAboutTimeline = (node) => {
    var splitTitle = new SplitText(node.querySelector("h1"), {type: 'lines,words'}),
        splitTitle2 = new SplitText(node.querySelector('.titlePc')),
        splitWords = splitTitle.words,
        splitWords2 = splitTitle2.words,
        img = node.querySelector('#img'),
        parags = node.querySelectorAll("p"),
        
        timeline = gsap.timeline({ paused: true });

    timeline
        .from(img, 2, { width: 0, opacity: 0, ease: Expo.easeOut })
        .from(splitWords, 2, { y: '100%', ease: Expo.easeOut }, "-=1.5")
        .from(splitWords2, 2, { y: '100%', ease: Expo.easeOut }, "-=1.5")
        .staggerFrom(parags, 1, {y: 20, opacity: 0}, 0.2, "-=1.6");
    
    return timeline;
}

//
const getGalleryTimeline = (node) => {
    var timeline = gsap.timeline({paused: true}),
        col1 = node.querySelector(".collumn1"),
        col2 = node.querySelector(".collumn2");
    
    timeline
        .staggerFrom(col1, 1, {x: 30, opacity: 0}, 0.2)
        .staggerFrom(col2, 1, {x: 30, opacity: 0}, 0.2, "<");

    return timeline;
}

/*const getProjectExitTimeline = (node) => {
    var timeline = gsap.timeline({paused: true}),
        splitTitle = new SplitText(`${node} #txt h1`, {type:"lines,words"}),
        splitWords = splitTitle.words;
    timeline
        .to(splitWords, 0.7, { opacity: 0, y: '100%' })
        .to(`${node} #img`, 1, { width: 0 }, "-=0.5")
        .to(`${node} #project`, 0.7, { top: '+=120', opacity: 0, ease: Power1.easeOut }, "-=1");
    return timeline;
}*/