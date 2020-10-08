import * as actionTypes from './actionTypes';

export const setShowAllProjs = (show) => {
    return {
        type: actionTypes.SET_SHOW_ALL_PROJECTS,
        show: show
    }
}

export const setShowProj = (show) => {
    return {
        type: actionTypes.SET_SHOW_PROJECT,
        show: show
    }
}

export const setCurrSection = (section) => {
    return {
        type: actionTypes.SET_CURR_SECTION,
        currSection: section
    }
}

export const setScrollPosition = (scroll) => {
    return {
        type: actionTypes.SET_SCROLL_POSITION,
        scrollPosition: scroll
    }
}

export const setPagesTransition = (prevPage, nextPage) => {
    return {
        type: actionTypes.SET_PAGES_TRANSITION,
        nextPage: nextPage,
        prevPage: prevPage
    }
}