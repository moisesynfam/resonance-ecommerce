import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';

import jwt_decode from "jwt-decode";
import ResonanceApi from "./apis/Resonance";
import { loadUser, logoutUser } from "./redux/actions/auth";

import { Layout } from 'antd';

import Home from './pages/Home';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import MyAccount from './pages/User/MyAccount';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Catalog from './pages/Furniture/Catalog';

const store = createStore(reducers, applyMiddleware(reduxThunk));

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  ResonanceApi.setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(loadUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout className="App" style={{display: 'flex', flexDirection: 'column'}}>
          <Header/>
          <Layout.Content style={{width: '100%', display: 'flex', flexDirection: 'column'}} >
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signUp" exact component={SignUp} />
              <Route path="/login" exact component={Login} />
              <Route path="/catalog" exact component={Catalog} />
              <PrivateRoute path="/myAccount" exact component={MyAccount} />

              <Route path="*" component={Home}/>
            </Switch>
           
             
          </Layout.Content>
          <Footer/>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
