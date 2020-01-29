import { all } from 'redux-saga/effects';

import { defaultState } from '../getDefaultState';
import { stateDataList } from '../utils';

// Set test state to Local Storage

function* setInitialState() {
  yield all(stateDataList.map((item) => {
    return window.localStorage.setItem(item, JSON.stringify(defaultState[item]));
  }));
}

export default setInitialState;
