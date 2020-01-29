import { put, takeEvery } from 'redux-saga/effects';

import { setCurrentUser } from '../actions';
import { LOGIN_USER } from '../constants';
import { defaultState } from '../getDefaultState';

function* putSetAuthToken() {
  // check user data
  // if user - put action SET_CURRENT_USER
  // else - put action LOGIN_USER_ERROR
  yield put(setCurrentUser(defaultState.currentUser));
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, putSetAuthToken);
}

export default watchLoginUser;
