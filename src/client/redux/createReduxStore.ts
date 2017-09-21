import rootReducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { timeInit } from './time/time';
import { getDeals } from './deals/actions';

export function createReduxStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

  store.dispatch(timeInit());
  store.dispatch(getDeals());
  return store;
}