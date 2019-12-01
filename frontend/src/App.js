import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';

import { Layout } from 'antd';

import Home from './pages/Home';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';

import Header from './components/Header';
import Footer from './components/Footer';

const store = createStore(reducers, applyMiddleware(reduxThunk));
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout className="App" style={{ background: '#fff'}}>
          <Header/>
          <Layout.Content style={{ height: '100%', width: '100%'}} >
            <Route path="/" exact component={Home} />
            <Route path="/signUp" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
          </Layout.Content>
          <Footer/>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
