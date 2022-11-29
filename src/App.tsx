import React from "react";
import RouteConfig from "./route/RouteConfig";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./style/index.scss";

function App() {
  return (
    <Provider store={store}>
      <RouteConfig />
    </Provider>
  );
}

export default App;
