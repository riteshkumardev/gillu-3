// import { createStore, applyMiddleware } from "redux";
// import rootReducer from "../reducers";
// import thunk from "redux-thunk";

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// const store = createStore(
//   rootReducer /* preloadedState, */,
//   +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// export default store;
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../reducers";
// import { snackbarNotificationReducer } from "./snackbar.reducer";

const reducer = combineReducers({
  // cart: cartReducer
  products: rootReducer,
  //   snackbarNotification: snackbarNotificationReducer,
});

export default configureStore({
  reducer,
  composeWithDevTools,
});
