import React from 'react';
import './App.css';
import {ConfigProvider, DatePicker, message} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
    this.setState({date});
  };

  render() {
    const {date} = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <div style={{width: 400, margin: '100px auto'}}>
          <DatePicker onChange={this.handleChange}/>
          <div style={{marginTop: 20}}>
            当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
          </div>
        </div>
      </ConfigProvider>
    );
  }
}

export default App;
