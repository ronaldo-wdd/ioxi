import { takeLeading } from "redux-saga/effects";
import { fetchProjectsSaga } from './projects';
import * as actionsType from '../actions/actionTypes';


export function* watchProjects () {
    yield takeLeading(actionsType.FETCH_PROJECTS, fetchProjectsSaga);
}