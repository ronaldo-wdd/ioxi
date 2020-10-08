import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker'; // ???
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import navigationReducer from './store/reducers/navigation';
import projectsReducer from './store/reducers/projects';
import { watchProjects } from './store/sagas';


const rootReducer = combineReducers({
  navigation: navigationReducer,
  projects: projectsReducer
});

// const composeEnhancers = process.env.NODE_ENV === "development"
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   : null || compose;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware)) );

sagaMiddleware.run(watchProjects);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();