import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import MainPage from './components/pages/MainPage';
import { MainTemplate } from './components/templates/MainTemplate';
import { Footer } from './components/organisms/Footer';
import { Header } from './components/organisms/Header';
import { NewDealPage } from './components/pages/NewDealPage';
import { routeFor } from './utils/routes';
import SuccessDealPage from './components/pages/SuccessDealPage';
import './styles/index';
import { createReduxStore } from './redux/createReduxStore';
import { Redirect } from 'react-router';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={createReduxStore()}>
        <Router>
          <MainTemplate {...{ Header, Footer }}>
            <Switch>
              <Route exact path={routeFor.Index} component={MainPage}/>
              <Route path={routeFor.NewDeal} component={NewDealPage}/>
              <Route path={routeFor.DealSuccess} component={SuccessDealPage}/>
              <Route render={() => <Redirect to={routeFor.Index}/>}/>
            </Switch>
          </MainTemplate>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);