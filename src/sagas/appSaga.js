import { all, put, takeEvery, select, fork } from 'redux-saga/effects';

import {
  addFile,
  deleteFile,
  updateTaskAddComment,
  deleteComment,
  updateCommentAddFile,
  updateTaskDeleteComment,
} from '../actions';

import {
  ADD_TASK,
  ADD_COMMENT,
  UPDATE_COMMENT_DELETE_FILE,
} from '../constants';

import { genHash, compareHash } from '../utils';

function* pushTaskUrlToHistory({ payload }) {
  const { history, path, id } = payload;
  yield history.push(`${ path }/task/${ id }`);
}

export function* watchAddTask() {
  yield takeEvery(ADD_TASK, pushTaskUrlToHistory);
}

function* checkIsFileExistAndUpdateTask({ payload }) {
  yield put(updateTaskAddComment(payload.parentId, payload.id));
  if (payload.files.length > 0) {
    const data = yield select();
    yield all(payload.files.map(file => {
      const fileIsExist = data.files.find(item => compareHash(file.url, item.id));
      if (!fileIsExist) {
        const hash = genHash(file.url);
        return all([
          put(addFile(file, hash, payload.id)),
          put(updateCommentAddFile(hash, payload.id)),
        ]);
      } else {
        return put(updateCommentAddFile(fileIsExist.id, payload.id));
      }
    }));
  }
}

export function* watchAddComment() {
  yield takeEvery(ADD_COMMENT, checkIsFileExistAndUpdateTask);
}

function* deleteFileAndCommentUpdateTask({ payload }) {
  const data = yield select();
  const comment = yield data.comments.find((comment) => (comment.id === payload.parentId));
  const fileIsUsed = yield data.comments.find(
    (comment) => comment.files.find((file) => (file === payload.fileId)),
  );
  if (!comment.label && (comment.files.length === 0)) {
    yield put(deleteComment(comment.parentId, comment.id));
    yield put(updateTaskDeleteComment(comment.parentId, comment.id));
  }
  if (!fileIsUsed) {
    yield put(deleteFile(payload.fileId));
  }
}

export function* watchUpdateCommentDeleleFile() {
  yield takeEvery(UPDATE_COMMENT_DELETE_FILE, deleteFileAndCommentUpdateTask);
}

export default function* appSaga() {
  yield all([
    fork(watchAddTask),
    fork(watchAddComment),
    fork(watchUpdateCommentDeleleFile),
  ]);
}
