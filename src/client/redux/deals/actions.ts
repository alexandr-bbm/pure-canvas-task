import axios from 'axios';

import { Thunk } from '../types';
import { Deal, ServerDeal } from './model';
import { parseDeals } from './parseDeals';

export type DealsAction
  = { type: 'deals/update', payload: { deals: Deal[] } }
  | { type: 'deals/remove', payload: { id: string } };

export type SubmitDeal = {
  value: string,
  date: string,
}

const errCb = (err: Error) => console.log(err);

export function addDeal(deal: SubmitDeal): Thunk {
  return (dispatch) => {
    return axios.post('/api/deals', deal)
      .then(({ data }) => dispatch(updateDeals(data)))
      .catch(errCb)
  }
}

export function removeDeal(id: number): Thunk {
  return (dispatch) => {
    return axios.delete(`/api/deals/${id}`)
      .then(({ data }) => dispatch(updateDeals(data)))
      .catch(errCb)
  }
}

export function getDeals(): Thunk {
  return (dispatch) => {
    axios.get('/api/deals')
      .then(({ data }) => dispatch(updateDeals(data)))
      .catch(errCb)
  }
}

function updateDeals(deals: ServerDeal[]) {
  return { type: 'deals/update', payload: { deals: parseDeals(deals) } }
}