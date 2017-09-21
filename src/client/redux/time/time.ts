import { Reducer, Thunk } from '../types';

type TimeAction
  = { type: 'time/tick' }
  | { type: 'time/set', payload: { time: Date } };

const ONE_SECOND = 1000;

let timeInterval: number;

export function timeInit(): Thunk {
  return (dispatch) => {
    if (timeInterval) {
      clearInterval(timeInterval);
    }

    dispatch({ type: 'time/set', payload: { time: new Date() } });

    timeInterval = window.setInterval(
      () => dispatch({ type: 'time/tick' }),
      ONE_SECOND
    );
  }
}

const timeReducer: Reducer<Date, TimeAction> = (date = new Date(), action) => {
  switch (action.type) {
    case 'time/tick':
      return new Date(date.setSeconds(date.getSeconds() + 1));

    case 'time/set':
      return action.payload.time;

    default:
      return date;
  }
};

export default timeReducer;