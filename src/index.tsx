import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import { mainReducer } from './store';

const composeEnhancers = 
    process.env.NODE_ENV === 'development' ? 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
        : null || compose; 

const store = createStore(mainReducer, undefined, composeEnchancers());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App /> 
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
    
    