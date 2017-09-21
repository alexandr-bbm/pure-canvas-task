import { Deal, ServerDeal } from './model';

export function parseDeals(serverDeals: ServerDeal[]): Deal[] {
  return serverDeals.map(parseDeal)
}

function parseDeal(serverDeal: ServerDeal): Deal {
  const { id, value, date } = serverDeal;
  return {
    id,
    value,
    date: new Date(date),
  }
}