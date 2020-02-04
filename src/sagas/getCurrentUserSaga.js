import { put } from 'redux-saga/effects';

import { setCurrentUser } from '../actions';

function* getCurrentUser() {
  try {
    const user = yield localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser')) : null;
    yield put(setCurrentUser(user));
  } catch (error) {
    // Do nothing
  }
}

export default getCurrentUser;
