
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "routes.js";
import MainNavbar from "../components/Navbars/MainNavbar";
import MainFooter from "../components/Footers/MainFooter";

class Appointment extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/appointment") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 1; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Appointment";
  };
  render() {
    return (
      <>
    
        <div className="main-content" ref="mainContent">
          <MainNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/appointment" />
          </Switch>

        </div>
        <MainFooter/>

      </>
    );
  }
}

export default Appointment;
