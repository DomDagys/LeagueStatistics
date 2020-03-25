import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { Header } from "../_components/Header";
import Settings from "../AccountSettings/AccountSettings";
import { ModalForm } from "../ModalSummonerForm/ModalForm";
// Siek tiek info:
// PrivateRoute -
class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    const { user } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <div>
            <div className="container">
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
              <Router history={history}>
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <PrivateRoute path="/settings" component={Settings} />
                  <PrivateRoute path="/update" component={ModalForm} />
                  <Redirect from="*" to="/" />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
