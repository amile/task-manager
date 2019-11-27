import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/app/app';

import store from './store';

store.subscribe(() => console.log('subscribe', store.getState()));

ReactDOM.render(
    <Provider store={ store }>
        <Router >
            <App projects={store.getState().projects}/>
        </Router>  
    </Provider>,
    document.getElementById('root')
);
