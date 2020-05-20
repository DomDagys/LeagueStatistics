import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./_helpers";
import { App } from "./App";

// setup fake backend
//import { configureFakeBackend } from "./_helpers";
//configureFakeBackend();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
