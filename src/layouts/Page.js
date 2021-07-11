import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// core components
import PageNavbar from "components/Navbars/PageNavbar.js";
import routes from "routes.js";
import "../i18n";
import { useDispatch, useSelector } from "react-redux";
const Page = (props) => {
  // console.log("Check page navbar props", props.location.pathname);
  const business = useSelector(({ business }) => business);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/") {
        return props.location.pathname == "/" ? (
          business.accessToken ? (
            <Redirect to="/admin/dahsboard" />
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <Route
            exact
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
  return (
    <>
      <PageNavbar {...props} />
      <div className="wrapper wrapper-full-page">
        <div className="full-page section-image" filter-color="yellow">
          <Switch>{getRoutes(routes)}</Switch>
        </div>
      </div>
    </>
  );
};

export default Page;
