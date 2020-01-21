import { all, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { stateDataList } from '../utils';

// Load data from Local Storage

function* loadData() {
    yield all(stateDataList.map((item) => {
        const data = localStorage.getItem(item) 
            ? JSON.parse(localStorage.getItem(item)) : [];
        return put(actions[item + 'Loaded'](data))
    }));   
}

export default loadData;
