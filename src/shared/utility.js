import { SplitText } from '../shared/splittext/splittext';


// load images Src ---
export const imagesSrc = (imgsName) => {
    const images = imgsName.map( img => {
        const imgPath = [];
        imgPath.push(require('../assents/images/Projects/' + img));
        return imgPath;
    });
    return images;
}

// Split Text ---
export function SplitTitle (node) {
    var splittext = new SplitText(node, {type:"lines,words"});
    
    this.lines = splittext.lines;
    this.words = splittext.words;
    this.revert = splittext.revert;
    this.originalHTML = splittext.originalHTML;
    this.htmlObjects = splittext.HTMLobjects;
}

// Scroll ---
export const scrollY = (e, prevDeltaY, maxDeltaY) => {
    let deltaY = e.deltaY,
        newDeltaY = prevDeltaY + deltaY;

    newDeltaY = Math.max(0, newDeltaY);
    newDeltaY = Math.min(maxDeltaY, newDeltaY);

    return newDeltaY;
}