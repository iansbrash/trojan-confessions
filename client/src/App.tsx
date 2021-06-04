import React, {
  FC, 
  useEffect,
  useState,
  createContext,
  useContext
} from 'react';
import Home from './Components/Home/Home'
import Login from './Components/AdminLogin/Login';
import Preview from './Components/Preview/Preview';
import Dashboard from './Components/AdminLogin/Dashboard';
import LoadingIndicator from './Components/Home/LoadingIndicator';
import Confessions from './Components/Confessions/Confessions';
import Anonymity from './Components/Anonymity/Anonymity';
import About from './Components/About/About';
import IMessageRoute from './Components/Preview/IndividualRoutes/IMessageRoute';
import ZoomRoute from './Components/Preview/IndividualRoutes/ZoomRoute';
import TinderRoute from './Components/Preview/IndividualRoutes/TinderRoute';
import EmailRoute from './Components/Preview/IndividualRoutes/EmailRoute';
import TwitterRoute from './Components/Preview/IndividualRoutes/TwitterRoute';

// Header Testing
import HeaderTest from './Components/HeaderTest/HeaderTest';

// tailwind
import "tailwindcss/tailwind.css";

// helmet
import { Helmet } from "react-helmet";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';




const PrivateRoute : FC<any> = ({ children, ...rest } : any) => {

  const [cookies, setCookie] = useCookies(['jwt_token']);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axios({
          method: 'post',
          url: '/api/admin/auth/',
          headers: {
            jwt_token: cookies['jwt_token']
          }
        });
  
        if (res.status === 200){
          setIsAuthed(true);
        }
      }
      catch (e) {
        console.log('error')
        console.log(e);
        setIsAuthed(false);
      }
      console.log(`isAuthed: ${isAuthed}`)
      setLoading(false);
    })();

  }, []);


  return (
    <>
    {loading 
    ? 
      <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
        <LoadingIndicator size={32}/>
      </div> 
    :  <Route
        {...rest}
        render={({ location }) =>
          isAuthed ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin/login",
                state: { from: location }
              }}
            />
          )
        }
      />}
    </>
  )
}

function App() {


  return (
      <Router>
        <Switch>

          {/* /admin/login */}
          <Route path="/admin/login">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Login />
          </Route>

          {/* /admin/dashboard */}
          <PrivateRoute path="/admin/dashboard">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Dashboard />
          </PrivateRoute>

          {/* /anonymity */}
          <Route path="/anonymity">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Anonymity />
          </Route>

          {/* /about */}
          <Route path="/about">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <About />
          </Route>

          {/* /confessions */}
          <Route path="/confessions">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Confessions />
          </Route>

          {/* /preview/imessage */}
          <Route path="/preview/imessage">
            <IMessageRoute />
          </Route>

          {/* /preview/imessage */}
          <Route path="/preview/zoom">
            <ZoomRoute />
          </Route>

          {/* /preview/tinder */}
          <Route path="/preview/tinder">
            <TinderRoute />
          </Route>

          {/* /preview/email */}
          <Route path="/preview/email">
            <EmailRoute />
          </Route>

          {/* /preview/twitter */}
          <Route path="/preview/twitter">
            <TwitterRoute />
          </Route>

          {/* /preview */}
          <Route path="/preview">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Preview />
          </Route>

          {/* /headertest */}
          <Route path="/headertest">
            <HeaderTest />
          </Route>

          {/* / */}
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
