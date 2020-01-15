import { all, put, takeEvery, select } from 'redux-saga/effects';

import { projectLoaded, setCurrentUser, updateTaskAddTag, updateTaskDeleteComment,
    updateCommentAddFile, addFile, deleteFile } from './actions';

import { defaultState } from './getDefaultState';

import { LOGIN_USER, ADD_GROUP, ADD_TAG, ADD_TASK, UPDATE_TASK_ADD_COMMENT, ADD_FILE,
    UPDATE_COMMENT_DELETE_FILE } from './constants';

import { genFileHash, compareFileHash } from './utils';

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

function* putSetAuthToken({ payload }) {
    // check user data
    // if user - put action SET_CURRENT_USER
    // else - put action LOGIN_USER_ERROR
    console.log('login saga put')
    yield put(setCurrentUser('89'));
}

function* watchLoginUser() {
    console.log('login saga watch')
    yield takeEvery(LOGIN_USER, putSetAuthToken);
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
        const data = yield select();
        yield all(payload.files.map(file => {
            const fileIsExist = data.files.find(item => compareFileHash(file.url, item.id));
            if (!fileIsExist) {
                const hash = genFileHash(file.url);
                return put(addFile(file, hash, payload.id));
            } else {
                return put(updateCommentAddFile(fileIsExist.id, payload.id));
            }
        }));
    }
}

function* watchAddComment() {
    yield takeEvery(UPDATE_TASK_ADD_COMMENT, putAddFiles);
}

function* putAddFilesToComment({ payload }) {
    yield put(updateCommentAddFile(payload.file.id, payload.parentId));
} 

function* watchAddFile() {
    yield takeEvery(ADD_FILE, putAddFilesToComment);
}

function* putDeleteComment({ payload }) {
    
    const data = yield select();
    const comment = yield data.comments.find((comment) => comment.id === payload.parentId);
    const fileIsUsed = yield data.comments.find(
        (comment) => comment.files.find((file) => file === payload.fileId)
    );
    if (!comment.label && (comment.files.length === 0)) {
        yield put(updateTaskDeleteComment(comment.parentId, comment.id));
    }
    if (!fileIsUsed) {
        yield put(deleteFile(payload.fileId));
    }
    
}

function* watchDeleleFile() {
    yield takeEvery(UPDATE_COMMENT_DELETE_FILE, putDeleteComment);
}

export default function* rootSaga() {
    yield all([
        helloSagaSetInitialState(),
        loadData(),
        watchLoginUser(),
        saveState(),
        watchAddNewTag(),
        watchAddNewTask(),
        watchAddComment(),
        watchAddFile(),
        watchDeleleFile(),
    ]);
}