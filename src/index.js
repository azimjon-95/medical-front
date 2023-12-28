import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { allInfoApi } from "./redux/apiSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <ApiProvider api={allInfoApi}> */}
      <App />
      {/* </ApiProvider> */}
    </Provider>
  </BrowserRouter>
);
