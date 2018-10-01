import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import * as Immutable from 'immutable';
import rootReducer from '../reducers';
// import { StoreState } from '../types';

const sagaMiddleware = createSagaMiddleware();

// Add middlewares / enhancers here
const middlewares = [sagaMiddleware, createLogger()];

// tslint:disable-next-line
const enhancers: any[] = [];

// Install Chrome extension for Redux devtools
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// const initialState: StoreState = Immutable.Map({
//   enthusiasm: Immutable.Map(),
//   planner: {},
//   todos: {},
// });
const initialState = {};

const configureStore = (state = initialState) => {
  const store = createStore(
    rootReducer,
    state,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
