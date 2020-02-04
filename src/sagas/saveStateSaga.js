import { all, takeEvery, select } from 'redux-saga/effects';

import { SET_CURRENT_USER } from '../constants';

import { stateDataList } from '../utils';

// Take every update state actions and save new state to Local Storage

function* setStateToLocalStorage(item) {
  const data = yield select();
  try {
    const dataJSON = JSON.stringify(data[item]);
    yield window.localStorage.setItem(item, dataJSON);
  } catch (error) {
    console.log(`Error JSON.stringify data: ${ item }`);
  }
}

function* saveStateToLocalStorage() {
  yield all(stateDataList.map(item => {
    const re = new RegExp('^[A-Z]+_' + item.slice(0, -1).toUpperCase());
    return takeEvery( action => re.test(action.type), setStateToLocalStorage, item);
  }));
  yield takeEvery(SET_CURRENT_USER, setStateToLocalStorage, 'currentUser');
}

export default saveStateToLocalStorage;
