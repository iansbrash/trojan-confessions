import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import firebase from "firebase";

// tailwind
import "tailwindcss/tailwind.css"

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
