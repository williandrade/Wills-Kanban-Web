import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, rootStore } from "./stores/Root";
import App from "./components/App/App";
import "./services/i18n";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider value={rootStore}>
    <App />
  </Provider>
);
