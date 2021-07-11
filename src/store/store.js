import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from "./rootredux";
import rootSaga from "./rootSaga";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistConfig = {
//   key: 'SmartBeach',
//   storage,
//   whitelist: [
//     "auth",
//   ],
// }



export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  const persistor = persistStore(store);

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return { store, persistor }
};