import { Power1, Expo } from 'gsap';
import gsap from 'gsap';
import { SplitTitle } from '../utility';


export const play = (node, originalHtml, onAnimationEnd) => {
    let timeline = gsap.timeline({paused: true});
    var splitTitle = new SplitTitle(`${node} h1.active`),
        splitDesc = new SplitTitle(`${node} p.active`);

    timeline
        .from(splitTitle.words, 0.7, { y: '100%', opacity: 0 })
        .staggerFrom(splitDesc.lines, 0.7, { opacity: 0, y: 15 }, 0.06, '<', allDone(node, originalHtml, onAnimationEnd));
        
    window
        .loadPromise
        .then(() => requestAnimationFrame(() => timeline.play()))
}


export const exit = ( node ) => {
    let timeline = gsap.timeline({paused: true});
    var splitTitle = new SplitTitle(`${node} h1`),
        splitDesc = new SplitTitle(`${node} p`);

    timeline
        .staggerTo(splitDesc.lines, 0.7, { opacity: 0, y: 15, ease: Expo.easeIn }, -0.06)
        .to(splitTitle.words, 0.7, { y: '100%', opacity: 0 }, '-=0.5');
    
    timeline.play();
}


function allDone (node, originalHtml, onAnimationEnd) {
    // splitTitle.revert(splitTitle.htmlObjects, splitTitle.originalHTML);
    // console.log(document.querySelector(target), originalHtml);
    setTimeout( () => {
        try {
            document.querySelector(`${node} h1`).innerHTML = originalHtml.title;
            document.querySelector(`${node} p`).innerHTML = originalHtml.desc;
            onAnimationEnd();
        } catch { return }
    }, 1000);
}