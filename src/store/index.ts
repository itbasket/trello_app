import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { History } from 'history';
import boards, { boardsMiddleware } from './boards';

export interface AppState {

}
// @ts-ignore
const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers =
  process.env.NODE_ENV !== 'production' && t ? t : compose;

export default function configureStore(history: History) {
  const rootReducer = combineReducers<AppState>({

});

  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(
      applyMiddleware(

      )
    )
  );
}

export * from './counter';
export * from './auth';