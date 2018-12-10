import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Auth from './containers/Auth';
import { history } from './helpers/history';
import PrivateRoute from './components/Core/PrivateRoute';
import DashboardLayout from './containers/DashboardLayout';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <PrivateRoute path="/dashboard" component={DashboardLayout} />
          <Route path="/login" component={Auth} />
        </React.Fragment>
      </Router>
    );
  }
}
export default App;
