import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import firebase from "firebase";
import Login from './Components/AdminLogin/Login';

// tailwind
import "tailwindcss/tailwind.css"

// helmet
import { Helmet } from "react-helmet";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {

  return (
      <Router>
        <Switch>
          <Route path="/login">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Login />
          </Route>
          <Route path="/">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Home />
          </Route>
        </Switch>
      </Router>

  );
}

export default App;
