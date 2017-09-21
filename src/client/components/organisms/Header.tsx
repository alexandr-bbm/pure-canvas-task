import * as React from 'react';
import { Logo } from '../molecules/Logo';
import { SpaceBetween } from '../atoms/SpaceBetween';
import { Route, Switch } from 'react-router';
import { ButtonLink } from '../atoms/ButtonLink';
import { routeFor } from '../../utils/routes';

const NewDealButton = () =>
  <ButtonLink
    to={routeFor.NewDeal}
    buttonTheme="primary"
    text="New Deal"
    style={{ border: '1px solid #979797' }}
  />;

const BackButton = () =>
  <ButtonLink
    to={routeFor.Index}
    buttonTheme="basic"
    text="Back"
  />;

export const Header = () => {
  return (
    <SpaceBetween>
      <Logo theme="main"/>
      <Switch>
        <Route exact path={routeFor.Index} component={NewDealButton}/>
        <Route path={routeFor.NewDeal} component={BackButton}/>
        <Route path={routeFor.DealSuccess} component={BackButton}/>
      </Switch>
    </SpaceBetween>
  )
};