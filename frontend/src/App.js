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
    
      
      
        <BrowserRouter>
          <Layout className="App" style={{ background: '#fff'}}>
            <Header/>
            <Layout.Content style={{ height: '100%', width: '100%'}} >
              <Route path="/" exact component={Home} />
              <Route path="/signUp" exact component={SignUp} />
            </Layout.Content>
            <Footer/>
          </Layout>
        </BrowserRouter>
     
      
    
  );
}

export default App;
