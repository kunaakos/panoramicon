import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";

import { App } from "./components/App";

import { globalStyles } from "./globalStyles";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>
);
