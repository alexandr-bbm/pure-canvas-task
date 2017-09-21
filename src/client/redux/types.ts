import { Dispatch } from 'react-redux';
import { Deal } from './deals/model';

export type ReduxState = {
  deals: Deal[];
  time: Date;
}

type ThunkExtraArgument = {
  api: any;
}

export type Thunk = (dispatch: Dispatch<ReduxState>,
                     getState: () => ReduxState,
                     arg: ThunkExtraArgument,) => Promise<any> | void;

export type Reducer<S, A> = (state: S, action: A) => S;