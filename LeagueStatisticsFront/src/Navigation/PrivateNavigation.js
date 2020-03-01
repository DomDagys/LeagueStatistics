import React from "react";
import NavigationBar from "./NavigationBar";
import { Route, Redirect } from "react-router-dom";

export const PrivateNavigation = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("user") ? (
        <NavigagtionBar {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
