import React from 'react';
import './App.css';
import {Layout} from 'antd';
import Header from './views/header';
import Footer from './views/footer';
import Monitor from './views/monitor'

class App extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <Header/>
          <Monitor/>
          <Footer/>
        </Layout>
      </>
    );
  }
}

export default App;
