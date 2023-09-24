import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));

const  { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID,REACT_APP_AUTH0_AUDIENCE} = process.env;

axios.defaults.baseURL = process.env.REACT_APP_API;
root.render(
  /* <React.StrictMode> */
  <Auth0Provider 
  domain={REACT_APP_AUTH0_DOMAIN} 
  clientId={REACT_APP_AUTH0_CLIENT_ID}
  audience={REACT_APP_AUTH0_AUDIENCE}  
  redirectUri={window.location.origin}
  authorizationParams={{
    redirect_uri: window.location.origin,
		audience: REACT_APP_AUTH0_AUDIENCE
  }} >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>

  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
