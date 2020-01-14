import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, Middleware, MiddlewareAPI, applyMiddleware } from 'redux';
import { App } from './components/App';
import { BrowserRouter, RouteChildrenProps, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import { mainReducer } from './store';

export const logger: Middleware = (middlewareApi: MiddlewareAPI) => (next: any) => {
    return (action: any) => {
        //const { dispatch, getState } = middlewareApi;
        console.log('ACTION', action, middlewareApi)
        next(action);
    }
}

const composeEnhancers = 
    process.env.NODE_ENV !== 'production' &&
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
        ?
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
        : compose; 

const store = createStore(mainReducer, undefined, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <Route path="/" render={(props: RouteChildrenProps) => <App {...props} />} />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
    
    