import { combineReducers } from 'redux';
import dealsReducer from './deals/reducer';
import timeReducer from './time/time';

export default combineReducers({
  deals: dealsReducer,
  time: timeReducer,
});