import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

export default function ProtectedRouteMiProfile({ children, ...rest }) {
  let { user } = useAuth0();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
