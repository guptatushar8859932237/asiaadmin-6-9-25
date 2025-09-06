import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ClientIdContext from "./Context/ClientIdContext";
const CLIENT_ID =
  "1064963448063-6rh5sssmnnj2qh7ucrpvmjv8ln9ma68a.apps.googleusercontent.com";
ReactDOM.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ClientIdContext.Provider value={CLIENT_ID}>
      <App />
    </ClientIdContext.Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

reportWebVitals();
