import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { CookiesProvider } from 'react-cookie';

// Use your config values here.
firebase.initializeApp({
  apiKey: "AIzaSyC1FKqaFxaK8EVE5L4qk-do6jveU1gnCek",
  authDomain: "trojan-confessions-fb.firebaseapp.com",
  projectId: "trojan-confessions-fb",
  storageBucket: "trojan-confessions-fb.appspot.com",
  messagingSenderId: "1028464703772",
  appId: "1:1028464703772:web:648d7c2ee8c5d7b595e2d9",
  measurementId: "G-KLEB16W0BE"
});

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      {/* <HashRouter
      // basename={"/"}
      > */}
        <App />
      {/* </HashRouter> */}
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
