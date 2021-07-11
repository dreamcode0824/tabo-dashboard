import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import UserNavbar from "components/Navbars/UserNavbar.js";

import routes from "routes.js";

var ps;

class User extends React.Component {
  state = {

  };
  mainPanel = React.createRef();

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.mainPanel.current);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  // componentDidUpdate(e) {
  //   if (e.history.action === "PUSH") {
  //     document.documentElement.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //     this.mainPanel.current.scrollTop = 0;
  //   }
  //   }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/user") {
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
  // getActiveRoute = (routes) => {
  //   let activeRoute = "Default Brand Text";
  //   for (let i = 0; i < routes.length; i++) {
  //     if (routes[i].collapse) {
  //       let collapseActiveRoute = this.getActiveRoute(routes[i].views);
  //       if (collapseActiveRoute !== activeRoute) {
  //         return collapseActiveR    
  //       }
  //     } else {
  //       if (
  //         window.location.pathname.indexOf(
  //           routes[i].layout + routes[i].path
  //         ) !== -1
  //       ) {
  //         return routes[i].name;
  //       }
  //     }
  //   }
  //   return activeRoute;
  // };
  render() {
    return (
      <>
        <UserNavbar {...this.props} />
        <div className="wrapper wrapper-full-page">
          <div className="full-page section-image">
            <Switch>
              {this.getRoutes(routes)}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

export default User;
