import React from 'react';
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons';
import {Layout, PageHeader, Tabs} from 'antd';
import ListDone from './list-done';

export default class extends React.Component {
  state = {
    headStyle: {
      height: 'auto'
    },
    contentStyle: {
      padding: '0px 50px'
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
            <PageHeader className="site-page-header" title="Title" subTitle="This is a subtitle"/>
          </Header>
          <Content style={contentStyle}>
            <Tabs defaultActiveKey="2">
              <TabPane key="1" tab={<span><AppleOutlined/> 识别中：4</span>}>
                <ListDone/>
              </TabPane>
              <TabPane key="2" tab={<span><AndroidOutlined/> 排队中：3</span>}>
                排队中
              </TabPane>
              <TabPane key="3" tab={<span><AndroidOutlined/> 已完成:4</span>}>
                已完成
              </TabPane>
            </Tabs>
          </Content>
          <Footer>
          </Footer>
        </Layout>
      </>
    );
  };
}
