import { all } from 'redux-saga/effects';

import setInitialState from './setInitialStateSaga';
import getCurrentUser from './getCurrentUserSaga';
import loadData from './loadDataSaga';
import saveStateToLocalStorage from './saveStateSaga';
import watchLoginUser from './loginUserSaga';
import appSaga from './appSaga';

export default function* rootSaga() {
  yield all([
    setInitialState(),
    getCurrentUser(),
    loadData(),
    saveStateToLocalStorage(),
    watchLoginUser(),
    appSaga()
  ]);
}