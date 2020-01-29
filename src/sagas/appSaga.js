import { all, put, takeEvery, select, fork } from 'redux-saga/effects';

import { updateTaskAddTag, updateTaskDeleteComment, updateCommentAddFile, 
  addFile, deleteFile, updateTaskAddComment, deleteComment } from '../actions';

import { ADD_TAG, ADD_TASK, ADD_COMMENT, DELETE_COMMENT, ADD_FILE,
  UPDATE_COMMENT_DELETE_FILE } from '../constants';

import { genHash, compareHash } from '../utils';

function* pushTaskUrlToHistory({ payload, history, path }) {
  yield history.push(`${ path }/task/${ payload.id }`);
}

export function* watchAddTask() {
  yield takeEvery(ADD_TASK, pushTaskUrlToHistory);
}

function* putUpdateTaskAddTag({ payload }) {
  yield put(updateTaskAddTag(payload.id, payload.tag.id));
}

export function* watchAddTag() {
  yield takeEvery(ADD_TAG, putUpdateTaskAddTag);
}

function* putUpdateTaskDeleteComment({ payload }) {
  yield put(updateTaskDeleteComment(payload.taskId, payload.commentId));
}

export function* watchDeleteComment() {
  yield takeEvery(DELETE_COMMENT, putUpdateTaskDeleteComment);
}

function* putUpdateTaskAddFiles({ payload }) {
  yield put(updateTaskAddComment(payload.parentId, payload.id));
  if (payload.files.length > 0) {
    const data = yield select();
    yield all(payload.files.map(file => {
      const fileIsExist = data.files.find(item => compareHash(file.url, item.id));
      if (!fileIsExist) {
        const hash = genHash(file.url);
        return put(addFile(file, hash, payload.id));
      } else {
        return put(updateCommentAddFile(fileIsExist.id, payload.id));
      }
    }));
  }
}

export function* watchAddComment() {
  yield takeEvery(ADD_COMMENT, putUpdateTaskAddFiles);
} 

function* putUpdateCommentAddFile({ payload }) {
  yield put(updateCommentAddFile(payload.file.id, payload.parentId));
}

export function* watchAddFile() {
  yield takeEvery(ADD_FILE, putUpdateCommentAddFile);
}

function* putDeleteCommentAndFile({ payload }) {
    
  const data = yield select();
  const comment = yield data.comments.find((comment) => comment.id === payload.parentId);
  const fileIsUsed = yield data.comments.find(
    (comment) => comment.files.find((file) => file === payload.fileId),
  );
  if (!comment.label && (comment.files.length === 0)) {
    yield put(deleteComment(comment.parentId, comment.id));
  }
  if (!fileIsUsed) {
    yield put(deleteFile(payload.fileId));
  }   
}

export function* watchUpdateCommentDeleleFile() {
  yield takeEvery(UPDATE_COMMENT_DELETE_FILE, putDeleteCommentAndFile);
}

export default function* appSaga() {
  yield all([
    fork(watchAddTag),
    fork(watchAddTask),
    fork(watchAddComment),
    fork(watchDeleteComment),
    fork(watchAddFile),
    fork(watchUpdateCommentDeleleFile),
  ]);
}