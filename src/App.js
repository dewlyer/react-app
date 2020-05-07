import React from 'react';
import './App.scss';
import {ConfigProvider, Layout} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import Header from './views/header';
import Footer from './views/footer';
import Monitor from './views/monitor';

class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Header/>
          <Monitor/>
          <Footer/>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default App;
