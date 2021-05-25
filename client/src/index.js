
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import VideoLayout from "layouts/Video.js";
import AppointmentLayout from "layouts/Appointment.js";
import UserLayout from "layouts/User.js";

import {Provider} from 'react-redux'
import history from "./history";
import requireAuth from "./utils/requireAuth";
import requireAdmin from "./utils/requireAdmin";
import checkIfAuth from "./utils/checkIfAuth";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {SIGN_IN} from "./actions/types";
import jwtDecode from "jwt-decode";
import store from 'store'
import GiveawayLayout from "layouts/Giveaway";

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch({type: SIGN_IN, user: jwtDecode(localStorage.jwtToken)});
}

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
            <Route path="/admin" component={requireAdmin(AdminLayout)} />
            <Route path="/auth" component={checkIfAuth(AuthLayout)} />
            <Route path="/video" component={VideoLayout} />
            <Route path="/appointment" component={AppointmentLayout} />
            <Route path="/giveaway" component={GiveawayLayout} />
            <Route path="/profile" component={requireAuth(UserLayout)}/>
            {/*<Redirect from="/" to="/auth/login" />*/}

        </Switch>
      </Router>
    </Provider>,
  document.getElementById("root")
);
