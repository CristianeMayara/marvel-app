import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import storeConfig from "./store";

const store = storeConfig();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" name="Home" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
