import { all, put, takeEvery, select } from 'redux-saga/effects';

import { projectLoaded, updateTaskAddTag, updateTaskDeleteComment,
    updateCommentAddFile, addFile, updateTaskAddFile } from './actions';

import { defaultState } from './getDefaultState';

import { ADD_GROUP, ADD_TAG, ADD_TASK, UPDATE_TASK_ADD_COMMENT, ADD_FILE,
    UPDATE_COMMENT_DELETE_FILE } from './constants';

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

function* pushNewTaskUrlToHistory({ payload, history, path }) {
    yield history.push(`${ path }/task/${ payload.id }`);
}

function* watchAddNewTask() {
    yield takeEvery(ADD_TASK, pushNewTaskUrlToHistory);
}

function* putAddFiles({ payload }) {
    if (payload.files.length > 0) {
        yield all(payload.files.map(file => put(addFile(file, payload.id))));
    }
}

function* watchAddComment() {
    yield takeEvery(UPDATE_TASK_ADD_COMMENT, putAddFiles);
}

function* putAddFilesToParent({ payload }) {
    const data = yield select();
    const parentIsComment = yield data.comments.find((comment) => comment.id === payload.parentId);
    const parentIsTask = yield data.tasks.find((task) => task.id === payload.parentId);
    if (parentIsComment) {
        yield put(updateCommentAddFile(payload.file.id, payload.parentId));
        
    }
    else if (parentIsTask) {
        yield put(updateTaskAddFile(payload.file.id, payload.parentId));
    }
}

function* watchAddFile() {
    yield takeEvery(ADD_FILE, putAddFilesToParent);
}

function* putDeleteComment({ payload }) {
    const data = yield select();
    const comment = yield data.comments.find((comment) => comment.id === payload.parentId);
    if (!comment.label && (comment.files.length === 0)) {
        yield put(updateTaskDeleteComment(comment.parentId, comment.id));
    }
    
}

function* watchDeleleFile() {
    yield takeEvery(UPDATE_COMMENT_DELETE_FILE, putDeleteComment);
}

export default function* rootSaga() {
    yield all([
        helloSagaSetInitialState(),
        loadData(),
        saveState(),
        watchAddNewTag(),
        watchAddNewTask(),
        watchAddComment(),
        watchAddFile(),
        watchDeleleFile(),
    ]);
}