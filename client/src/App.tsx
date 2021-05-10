import React, {
  FC, 
  useEffect,
  useState,
  createContext,
  useContext
} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import Login from './Components/AdminLogin/Login';
import Preview from './Components/Preview/Preview';
import Dashboard from './Components/AdminLogin/Dashboard';

// tailwind
import "tailwindcss/tailwind.css"

// helmet
import { Helmet } from "react-helmet";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';

// @ts-ignore
const authContext = createContext<any>();

const fakeAuth = {
  isAuthenticated: false,
  signin(cb : () => void) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb : () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function ProvideAuth({ children } : any) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<string>(null!);

  const signin = () => {
    return fakeAuth.signin(() => {
      setUser("user");
      // cb();
    });
  };

  const signout = () => {
    return fakeAuth.signout(() => {
      setUser(null!);
      // cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

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
          url: 'http://localhost:5000/api/login/auth/',
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
    {loading ? <div className="text-2xl font-bold">LOADING!!!!</div> :  <Route
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

  // const fakeAuth = {isAuthenticated: true};
  

  return (
      <Router>
        <Switch>

          <Route path="/admin/login">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Login />
          </Route>

          <PrivateRoute path="/admin/dashboard">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Dashboard />
          </PrivateRoute>

          <Route path="/preview">
            <Helmet>
              <style>{'body { background-color: #F3F4F6; }'}</style>
            </Helmet>
            <Preview />
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
