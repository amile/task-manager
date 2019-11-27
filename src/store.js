import { createStore, applyMiddleware, compose } from 'redux';

// import { routerMiddleware as reduxRouterMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
// const routerMiddleware = reduxRouterMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
console.log('store', store.getState());
export default store;