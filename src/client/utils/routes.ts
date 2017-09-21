export type RouteName
  = '/'
  | '/new-deal'
  | '/deal-success';

export const routeFor: { [key: string]: RouteName } = {
  Index: '/',
  NewDeal: '/new-deal',
  DealSuccess: '/deal-success',
};