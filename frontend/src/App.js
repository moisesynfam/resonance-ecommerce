import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import { Layout } from 'antd';

import Home from './pages/Home';
import SignUp from './pages/Auth/SignUp';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Layout className="App" style={{ background: '#fff'}}>
      
      <Layout.Content style={{ height: '100%', width: '100%'}} >
        <BrowserRouter>
          <div style={{ height: '100%', width: '100%'}}>
            <Header/>
            <Route path="/" exact component={Home} />
            <Route path="/signUp" exact component={SignUp} />
          </div>
        </BrowserRouter>
      </Layout.Content>
      <Footer/>
    </Layout>
  );
}

export default App;
