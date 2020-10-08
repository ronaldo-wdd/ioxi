import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showAllProjects: false,
    showProject: false,
    currSection: 0,
    loading: false,
    animating: false,
    pagesTransition: { prev: false, next: true },
    scrollPosition: 0
}

const setShowAllProjs = (state, show) => {
    return {
        ...state,
        showAllProjects: show
    }
}
const setShowProj = (state, show) => {
    return {
        ...state,
        showProject: show
    }
}
const setCurrSection = (state, currSection) => {
    return {
        ...state,
        currSection: currSection,
        scrollPosition: 0
    }
}
const setPagesTransition = (state, prev, next) => {
    return {
        ...state,
        pagesTransition: { prev: prev, next: next}
    }
}
const setScrollPosition = (state, scroll) => {
    let scrollP = scroll !== 0 ? state.scrollPosition + scroll : 0;
    
    scrollP = Math.max(-450, scrollP);
    scrollP = Math.min(scrollP, 450);
    
    return {
        ...state,
        scrollPosition: scrollP
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SHOW_ALL_PROJECTS: return setShowAllProjs(state, action.show);
        case actionTypes.SET_SHOW_PROJECT: return setShowProj(state, action.show);
        case actionTypes.SET_CURR_SECTION: return setCurrSection(state, action.currSection);
        case actionTypes.SET_SCROLL_POSITION: return setScrollPosition(state, action.scrollPosition);
        case actionTypes.SET_PAGES_TRANSITION: return setPagesTransition(state, action.prevPage, action.nextPage);
        default: return state;
    }
}

export default reducer;