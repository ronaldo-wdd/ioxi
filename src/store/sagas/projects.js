import { put } from "redux-saga/effects";

import axios from "../../axios";
import * as actions from "../actions";
import { imagesSrc } from '../../shared/utility';


export function* fetchProjectsSaga(action) {
  try {
      const response = yield axios.get ("/projects.json");
      const fetchedProjs = [];
      const projsMainImg = [];
      for (let key in response.data) {
        fetchedProjs.push({
          ...response.data[key], id: key
        });
        projsMainImg.push(response.data[key].mainImg);
      }

      const images = imagesSrc(projsMainImg);

      yield put (actions.getProjsMainImgs(images));
      yield put (actions.fetchProjects(fetchedProjs));
  } catch (error) {
      yield put (actions.fetchProjectsFailed());
  }
}