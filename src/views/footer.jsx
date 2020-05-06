import React from 'react';
import {Layout} from 'antd';

export default class Footer extends React.Component {
  render() {
    const {Footer} = Layout;
    return <Footer style={{textAlign: 'center'}}>Copyright &copy; 2015-2020 Ajia.cn All Rights Reserved.</Footer>;
  };
}
