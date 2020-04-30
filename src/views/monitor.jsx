import React from 'react';
import './monitor.css';
import {
  TeamOutlined,
  SnippetsOutlined,
  CarryOutOutlined
} from '@ant-design/icons';
import {Layout, PageHeader, Tabs} from 'antd';
import TableList from './tableList';

export default class extends React.Component {
  state = {
    headStyle: {
      height: 'auto'
    },
    contentStyle: {
      margin: '0 50px',
      padding: '15px 25px'
    }
  };

  render() {
    const {headStyle, contentStyle} = this.state;
    const {Header, Footer, Content} = Layout;
    const {TabPane} = Tabs;
    return (
      <>
        <Layout>
          <Header style={headStyle}>
            <PageHeader className="site-page-header"
                        title="云端识别监控"
                        subTitle="A佳教育校园版云端识别监控系统"/>
          </Header>
          <Content style={contentStyle}>
            <Tabs defaultActiveKey="0">
              <TabPane key="0" tab={<span><SnippetsOutlined/> 识别中：4</span>}>
                <TableList type={0}/>
              </TabPane>
              <TabPane key="1" tab={<span><TeamOutlined/> 排队中：3</span>}>
                <TableList type={1}/>
              </TabPane>
              <TabPane key="2" tab={<span><CarryOutOutlined/> 已完成:4</span>}>
                <TableList type={2}/>
              </TabPane>
            </Tabs>
          </Content>
          <Footer style={{textAlign: 'center'}}>Copyright &copy; 2015-2020 Ajia.cn All Rights Reserved.</Footer>
        </Layout>
      </>
    );
  };
}
