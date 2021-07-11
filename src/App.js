import React, { Suspense } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/smart-beach.scss?v=1.4.0";
import "assets/css/demo.css";
import AdminLayout from "layouts/Admin.js";
import UserLayout from "layouts/User.js";
import PageLayout from "layouts/Page.js";
import { useDispatch, useSelector } from "react-redux";
const hist = createBrowserHistory();

function App() {
  const business = useSelector(({ business }) => business);
  return (
    <Router history={hist}>
      <Switch>
        <Route
          path="/admin"
          render={(props) => {
            // if (props.location.pathname === "/admin/wizard") {
            //   return <PageLayout {...props} />;
            // } else {
            //   if (business.accessToken) {
            //     return <AdminLayout {...props} />;
            //   } else {
            //     return <Redirect to="/login" />;
            //   }
            // }
            return business.accessToken ? (
              <AdminLayout {...props} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route
          path="/user"
          render={(props) => {
            return <UserLayout {...props} />;
          }}
        />
        <Route
          path="/"
          render={(props) => {
            return <PageLayout {...props} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
