import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import SpinnerComponent from "../components/Spinner";

export default function ProtectedRouteMiProfile({ children, ...rest }) {
  let { user, isLoading } = useAuth0();

  if (isLoading)
    return (
      <div>
        <SpinnerComponent />{" "}
      </div>
    );

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
