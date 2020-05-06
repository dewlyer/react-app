import React from 'react';
import {Layout, PageHeader} from 'antd';

export default class Header extends React.Component {
  state = {
    headStyle: {
      height: 'auto'
    }
  };

  render() {
    const {headStyle} = this.state;
    const {Header} = Layout;
    return (
      <Header style={headStyle}>
        <PageHeader className="site-page-header" title="云端识别监控" subTitle="A佳教育校园版云端识别监控系统"/>
      </Header>
    );
  };
}
