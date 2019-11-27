import { all, put, takeEvery, select } from 'redux-saga/effects';

import { projectLoaded, updateTaskAddTag } from './actions';

import { defaultState } from './getDefaultState';

import { ADD_GROUP, ADD_TAG, ADD_TASK } from './constants';

function* helloSagaSetInitialState() {
    yield window.localStorage.setItem('reduxState', JSON.stringify(defaultState))
}

function* setState() {
    const data = yield select();
    yield window.localStorage.setItem('reduxState', JSON.stringify(data));
}

function* saveState() {
    yield takeEvery(ADD_GROUP, setState);
    yield takeEvery(ADD_TASK, setState);
}

function* loadData() {
    const data = yield localStorage.getItem('reduxState') ? 
        JSON.parse(localStorage.getItem('reduxState')) : {};
    yield put(projectLoaded(data));
    
}

function* putTaskAddTag({ payload }) {
    yield put(updateTaskAddTag(payload.id, payload.tag.id));
}

function* watchAddNewTag() {
    yield takeEvery(ADD_TAG, putTaskAddTag);
}

function* pushNewTaskUrlToHistory({ payload, history }) {
    yield history.push(`/task/${ payload.id }`);
}

function* watchAddNewTask() {
    yield takeEvery(ADD_TASK, pushNewTaskUrlToHistory);
}
export default function* rootSaga() {
    yield all([
        helloSagaSetInitialState(),
        loadData(),
        saveState(),
        watchAddNewTag(),
        watchAddNewTask()
    ]);
}