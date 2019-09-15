import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./utils/polyfill";

import { CalcPage } from "./components/CalcPage";
import store from "./store";

// import "./App.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

ReactDOM.render(
  <Provider store={store.makeStore()}>
    <CalcPage />
  </Provider>,
  document.getElementById("root")
);
