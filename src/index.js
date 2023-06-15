import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import createSagaMiddleware from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';


function* fetchPlants(action) {
  try {
      console.log('fetchPlants dinged:', action);
      // hold response from server in plantsResponse
      const plantsResponse = yield axios.get('/api/plant');
      // after server responds, then this generator function/saga continues
      console.log('fetchPlants response.data is:', plantsResponse.data);
      yield put({ type: 'SET_PLANT_LIST', payload: plantsResponse.data })
  } catch (error) {
      console.log('Error with fetchPlants!', error);
  }
}

function* postPlant(action) {
  try {
      // send axios post to server with payload
      yield axios.post('/api/plant', action.payload);
      console.log('postPlant payload is:', action.payload);
      // trigger fetchPlants saga
      yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
      console.log('Error POST-ing plant', error);
  }
}

function* deletePlant(action) {
  try {
      // send axios post to server with payload
      yield axios.delete(`/api/plant${action.payload}`);
      console.log('deletePlant payload is:', action.payload);
      // trigger fetchPlants saga
      yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
      console.log('Error DELETE-ing plant', error);
  }
}


// Create the rootSaga generator function
function* rootSaga() {
  yield takeLatest('FETCH_PLANTS', fetchPlants);
  yield takeLatest('ADD_PLANT', postPlant);
  yield takeLatest('DELETE_PLANT', deletePlant);
}




const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ plantList }),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);