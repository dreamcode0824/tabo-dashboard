import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import './i18n';
import App from './App';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './store/store'
import { Provider } from 'react-redux'
const { persistor, store } = configureStore()
// append app to dom
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);