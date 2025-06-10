import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import reportWebVitals from './reportWebVitals';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SmuHWFUDs",
  client_id: "2kih0h4ra0c1ognli9tomv1hs7",
  redirect_uri: "https://main.d11x0rh1r8wz2j.amplifyapp.com",
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
// https://main.d11x0rh1r8wz2j.amplifyapp.com
//http://localhost:3000
// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();