import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, Middleware, MiddlewareAPI, applyMiddleware } from 'redux';
import { App } from './components/App';
import { BrowserRouter, RouteChildrenProps, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import { mainReducer } from './store';
import { ACTION_TYPES } from './store/types';

const asyncTimeout = async (fn: any, ms: number) => {
    setTimeout(() => {
        Promise.resolve(fn());
    }, ms)
}

export const logger: Middleware = (middlewareApi: MiddlewareAPI) => (next: any) => {
    return async (action: any) => {
        //const { dispatch, getState } = middlewareApi;
        if (action.type === ACTION_TYPES.INCREASE_COUNT) {
            await asyncTimeout(() => {
                console.log('fds');
            },2000)
        } else {
            next(action);
        }
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
    
    