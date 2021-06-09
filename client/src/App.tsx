import React, {
  FC, 
  useEffect,
  useState,
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
import NotesRoute from './Components/Preview/IndividualRoutes/NotesRoute';
import SnapchatRoute from './Components/Preview/IndividualRoutes/SnapchatRoute';
import InstagramRoute from './Components/Preview/IndividualRoutes/InstagramRoute';

import CatchallRoute from './Components/Preview/IndividualRoutes/CatchallRoute';

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
              <style>{'html {overflow: scroll;overflow-x: hidden;}::-webkit-scrollbar {width: 0;  background: transparent; }::-webkit-scrollbar-thumb {background: #FF0000;}'}</style>
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
              <style>{'html {overflow: scroll;overflow-x: hidden;}::-webkit-scrollbar {width: 0;  background: transparent; }::-webkit-scrollbar-thumb {background: #FF0000;}'}</style>
            </Helmet>
            <Confessions />
          </Route>

          {/* /preview/:theme */}
          <Route path="/preview/:theme" component={CatchallRoute}/>

          {/* /preview/imessage
          <Route path="/preview/imessage">
            <IMessageRoute />
          </Route>

          {/* /preview/imessage */}
          {/* <Route path="/preview/zoom">
            <ZoomRoute />
          </Route> */}

          {/* /preview/tinder */}
          {/* <Route path="/preview/tinder">
            <TinderRoute />
          </Route> */}

          {/* /preview/email */}
          {/* <Route path="/preview/email">
            <EmailRoute />
          </Route> */}

          {/* /preview/twitter */}
          {/* <Route path="/preview/twitter">
            <TwitterRoute />
          </Route> */}

          {/* /preview/snapchat */}
          {/* <Route path="/preview/snapchat">
            <SnapchatRoute />
          </Route> */}

          {/* /preview/notes */}
          {/* <Route path="/preview/notes">
            <NotesRoute />
          </Route> */}

          {/* /preview/notes */}
          {/* <Route path="/preview/instagram">
            <InstagramRoute />
          </Route> */}

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
              <style>{'html {overflow: scroll;overflow-x: hidden;}::-webkit-scrollbar {width: 0;  background: transparent; }::-webkit-scrollbar-thumb {background: #FF0000;}'}</style>

              <style>{'body { background-color: #F3F4F6;'}</style>
              {/* <style>
                {'html, body {overflow-x: hidden;}body {position: relative}'}
              </style>
              <meta name="viewport" content="user-scalable=0, width=device-width, initial-scale=1.0" />
              <meta name="apple-mobile-web-app-capable" content="yes" />             */}
            </Helmet>
            <Home />
          </Route>
          
        </Switch>
      </Router>

  );
}

export default App;
