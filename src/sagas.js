import { all, put, take, takeEvery, call, select } from 'redux-saga/effects';

// import { projectsLoaded, setCurrentUser, updateTaskAddTag, updateTaskDeleteComment,
//    updateCommentAddFile, addFile, deleteFile, updateTaskAddComment, deleteComment } from './actions';

import * as actions from './actions';

import { defaultState } from './getDefaultState';

import { LOGIN_USER, ADD_TAG, ADD_TASK, ADD_COMMENT, DELETE_COMMENT, ADD_FILE,
    UPDATE_COMMENT_DELETE_FILE, SET_CURRENT_USER, ADD_GROUP} from './constants';

import { genFileHash, compareFileHash } from './utils';

const dataList = ['projects', 'groups', 'tasks', 'users', 'tags', 'comments', 'files'];

// Set initial state to Local Storage
function* setInitialState() {
    yield all(dataList.map((item) => {
        window.localStorage.setItem(item, JSON.stringify(defaultState[item]));
    }));
}
// Load data from Local Storage
function* loadData() {
    yield all(dataList.map((item) => {
        const data = localStorage.getItem(item) 
            ? JSON.parse(localStorage.getItem(item)) : [];
        return put(actions[item + 'Loaded'](data))
    }));   
}

function* setCurrentUser() {
    const user = localStorage.getItem('currentUser') 
        ? JSON.parse(localStorage.getItem('currentUser')) : null;
    yield put(actions.setCurrentUser(user));
}

function* putSetAuthToken({ payload }) {
    // check user data
    // if user - put action SET_CURRENT_USER
    // else - put action LOGIN_USER_ERROR
    yield put(actions.setCurrentUser(defaultState.currentUser));
}

function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, putSetAuthToken);
}

// Take every update state actions and save new state to Local Storage 

function* setState(item) {
    const data = yield select();
    yield window.localStorage.setItem(item, JSON.stringify(data[item]));
}

function* saveState() {
    yield all(dataList.map(item => {
        const re = new RegExp('^[A-Z]+_' + item.slice(0, -1).toUpperCase());
        return takeEvery( action => re.test(action.type), setState, item);
    }));
    yield takeEvery(SET_CURRENT_USER, setState, 'currentUser');
}
// --------------

// Take every tasks actions and put update tasks

function* pushNewTaskUrlToHistory({ payload, history, path }) {
    yield history.push(`${ path }/task/${ payload.id }`);
}

function* watchAddNewTask() {
    yield takeEvery(ADD_TASK, pushNewTaskUrlToHistory);
}

function* putUpdateTaskAddTag({ payload }) {
    yield put(actions.updateTaskAddTag(payload.id, payload.tag.id));
}

function* watchAddNewTag() {
    yield takeEvery(ADD_TAG, putUpdateTaskAddTag);
}

function* putUpdateTaskDeleteComment({ payload }) {
    yield put(actions.updateTaskDeleteComment(payload.taskId, payload.commentId));
}

function* watchDeleteComment() {
    yield takeEvery(DELETE_COMMENT, putUpdateTaskDeleteComment);
}

// --------------

function* putUpdateTaskAddFiles({ payload }) {
    yield put(actions.updateTaskAddComment(payload.parentId, payload.id));
    if (payload.files.length > 0) {
        const data = yield select();
        yield all(payload.files.map(file => {
            const fileIsExist = data.files.find(item => compareFileHash(file.url, item.id));
            if (!fileIsExist) {
                const hash = genFileHash(file.url);
                return put(actions.addFile(file, hash, payload.id));
            } else {
                return put(actions.updateCommentAddFile(fileIsExist.id, payload.id));
            }
        }));
    }
}

function* watchAddComment() {
    yield takeEvery(ADD_COMMENT, putUpdateTaskAddFiles);
} 

function* putAddFilesToComment({ payload }) {
    yield put(actions.updateCommentAddFile(payload.file.id, payload.parentId));
}

function* watchAddFile() {
    yield takeEvery(ADD_FILE, putAddFilesToComment);
}



function* putDeleteCommentAndFile({ payload }) { 
    const data = yield select();
    const comment = yield data.comments.find((comment) => comment.id === payload.parentId);
    const fileIsUsed = yield data.comments.find(
        (comment) => comment.files.find((file) => file === payload.fileId)
    );
    if (!comment.label && (comment.files.length === 0)) {
        yield put(actions.deleteComment(comment.parentId, comment.id));
    }
    if (!fileIsUsed) {
        yield put(actions.deleteFile(payload.fileId));
    }   
}

function* watchUpdateCommentDeleleFile() {
    yield takeEvery(UPDATE_COMMENT_DELETE_FILE, putDeleteCommentAndFile);
}

function* putSomething(payload) {
    console.log('saga', payload)
    if (true) {
        console.log('saga true')
        
    }
}

function* watch() {
    const payload = yield take(ADD_GROUP);
    yield call(putSomething, payload);
}

export default function* rootSaga() {
    yield all([
        setInitialState(),
        loadData(),
        setCurrentUser(),
        watchLoginUser(),
        saveState(),
        watchAddNewTag(),
        watchAddNewTask(),
        watchAddComment(),
        watchDeleteComment(),
        watchAddFile(),
        watchUpdateCommentDeleleFile(),
        watch(),
    ]);
}