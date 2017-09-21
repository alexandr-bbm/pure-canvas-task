import { DealsAction } from './actions';
import { Reducer } from '../types';
import { Deal } from './model';

const dealsReducer: Reducer<Deal[], DealsAction> = (state = [], action) => {
  switch (action.type) {
    case 'deals/update':
      return action.payload.deals;

    case 'deals/remove':
      return state;

    default:
      return state;
  }
};

export default dealsReducer;