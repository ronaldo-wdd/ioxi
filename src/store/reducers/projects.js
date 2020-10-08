import * as actionTypes from '../actions/actionTypes';

const intialState = {
    projects: [],
    projsMainImg: [],
    error: false
}

const fetchProjects = (state, projects) => {
    return {
        ...state,
        projects: projects,
        error: false
    }
}

const fetchProjectsFailed = (state) => {
    return {
        ...state,
        error: true
    }
}

const getProjsMainImgs = (state, imgs) => {
    return {
        ...state,
        projsMainImg: imgs
    }
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS: return fetchProjects(state, action.projs);
        case actionTypes.FETCH_PROJECTS_FAILED: return fetchProjectsFailed(state);
        case actionTypes.GET_PROJECTS_MAIN_IMG: return getProjsMainImgs(state, action.imgs)
        default: return state;
    }
}

export default reducer;