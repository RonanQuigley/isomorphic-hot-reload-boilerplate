import ReactDOM from "react-dom";
import React from "react";
import App from "@react-app/app";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

loadableReady(() => {
  const root = document.getElementById("root");
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
});

if (module.hot) {
  module.hot.accept();
}
