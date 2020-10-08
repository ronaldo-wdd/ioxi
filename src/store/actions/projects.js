import * as actionTypes from './actionTypes';

export const fetchProjects = (projects) => {
    return {
        type: actionTypes.FETCH_PROJECTS,
        projs: projects
    }
}

export const fetchProjectsFailed = () => {
    return {
        type: actionTypes.FETCH_PROJECTS_FAILED
    }
}

export const getProjsMainImgs = (images) => {
    return {
        type: actionTypes.GET_PROJECTS_MAIN_IMG,
        imgs: images
    }
}