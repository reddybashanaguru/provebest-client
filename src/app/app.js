import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import "airbnb-js-shims";

// App style scss
import "./app.scss";

//Helpers Import
// import { getPermissionId } from "./helper/routeValidator";

//Component imports

// import Login from "./routes/login/";
import Sidebar from "../components/sidebar/";
import Header from "../components/header/";
import Footer from "../components/footer/footerComponent";
import AppLoginComponent from "../routes/app-login/";
import HOMEPAGE from "../routes/homepage/homepage";

const RedirectToLogin = ({ location }) => (
  <Redirect to={"/login?redirect=" + location.pathname + location.search} />
);

const Page404 = (props) => (
  <section className="hero is-large">
    <div className="hero-body has-text-centered">
      <h5 className="title is-5">Oops! This page does not exist.</h5>
    </div>
  </section>
);

const UnauthorizedPage = (props) => (
  <section className="hero is-large">
    <div className="hero-body has-text-centered">
      <h5 className="title is-5">
        You do not have permission to view this page.
      </h5>
    </div>
  </section>
);

const App = (props) => {
  // Check for login from cookie
  const { cookies } = props;
  const user = cookies.get("user");

  // TODO: Need to enable Login Check for rendering the components
  // const withLoginCheck = Component => {
  //   return user ? Component : RedirectToLogin
  // };

  const renderComponent = (Component, routeProps, isRoute) => {
    // const permissions = props.loginPermissions || props.permissions;
    // const permissionId = getPermissionId(
    //     routeProps.location.pathname,
    //     permissions
    // );
    // let cpermissions = JSON.parse(sessionStorage.getItem("permissions"));
    // if (isRoute && user && !permissionId) {
    //     return <UnauthorizedPage {...routeProps} />;
    // }
    // return user ? (
    //     <Component permissions={cpermissions} {...routeProps} permissionId={permissionId} />
    // ) : (
    return <RedirectToLogin {...routeProps} />;
    // );
  };

  return (
    <div>
      <div className="columns">
        {/* {user && ( */}
        <div className="container">
          <Route component={Header} />
        </div>
        {/* )} */}
        <div className="column main-content-layout">
          <Switch>
            {/* PUBLIC ROUTES */}
            {/* <Route
              exact
              path="/"
              //render={routeProps => renderComponent(Dashboards, routeProps)}
              render={(routeProps) =>
                renderComponent(AppLoginComponent, routeProps)
              }
            /> */}
            <Route exact path="/" component={AppLoginComponent} />
            <Route exact path="/homepage" component={HOMEPAGE} />
            {/* LOGGED IN ROUTES */}
            {/* <Route
              exact
              path="/"
              //render={routeProps => renderComponent(Dashboards, routeProps)}
              render={(routeProps) =>
                renderComponent(TicketManagement, routeProps)
              }
            /> */}
            {/* 404 ROUTE */}
            {/* <Route component={Page404} /> */}
          </Switch>
        </div>
      </div>
      {/* <Route component={Footer} /> */}
    </div>
  );
};

export default withRouter(
  withCookies(
    connect((state) => ({
      loginPermissions: [],
      // state.login.permissions || [],
      permissions: [],
      // state.permissionsData.permissions || []
    }))(App)
  )
);
