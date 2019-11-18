import { all, put, takeEvery, select } from 'redux-saga/effects';

import { projectLoaded } from './actions';

import { defaultState } from './getDefaultState';

import { GROUP_ADDED } from './constants';

function* helloSagaSetInitialState() {
    console.log('Hello Saga');
    yield window.localStorage.setItem('reduxState', JSON.stringify(defaultState))
}

function* setState() {
    const data = yield select();
    yield window.localStorage.setItem('reduxState', JSON.stringify(data));
}

function* saveState() {
    yield takeEvery(GROUP_ADDED, setState);
}
function* loadData() {
    const data = yield localStorage.getItem('reduxState') ? 
        JSON.parse(localStorage.getItem('reduxState')) : {};
    yield put(projectLoaded(data));
    
}

export default function* rootSaga() {
    yield all([
        helloSagaSetInitialState(),
        loadData(),
        saveState(),
    ]);
}