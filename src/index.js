import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter as Router } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR11YqSd5SNL-PIvFseODN6qQYz6VFkKY",
  authDomain: "new-messenger-11851.firebaseapp.com",
  databaseURL: "https://new-messenger-11851-default-rtdb.firebaseio.com",
  projectId: "new-messenger-11851",
  storageBucket: "new-messenger-11851.appspot.com",
  messagingSenderId: "836003557836",
  appId: "1:836003557836:web:97c567c0ed11ac77f3ed69",
  measurementId: "G-NNF99NE147",
};

firebase.initializeApp(firebaseConfig);

// window.store = store;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
