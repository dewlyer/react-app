import React from 'react';
import './monitor.css';
import {
  TeamOutlined,
  SnippetsOutlined,
  CarryOutOutlined
} from '@ant-design/icons';
import {Layout, PageHeader, Tabs} from 'antd';
import TableList from './tableList';
import {getMonitorInfo} from '../api/cloudRecognition';

export default class extends React.Component {
  state = {
    headStyle: {
      height: 'auto'
    },
    contentStyle: {
      margin: '0 50px',
      padding: '15px 25px'
    },
    info: {}
  };

  queryTableList = async () => {
    try {
      const {data} = await getMonitorInfo();
      this.setState({info: data});
    } catch (e) {
      throw e;
    }
  };

  componentDidMount() {
    this.queryTableList().catch(e => console.log(e));
  }

  render() {
    const {headStyle, contentStyle, info} = this.state;
    const {Header, Footer, Content} = Layout;
    const {TabPane} = Tabs;
    const {
      recognitionTotalOneMinuteBefore: speed = 0,
      recognitionSubjectTotal: process = 0,
      finishedSubjectTotal: finish = 0
    } = info;
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
              <TabPane key="0" tab={<span><SnippetsOutlined/> 识别中：{process}</span>}>
                <TableList type={0}/>
              </TabPane>
              <TabPane key="1" tab={<span><TeamOutlined/> 排队中：{speed}</span>}>
                <TableList type={1}/>
              </TabPane>
              <TabPane key="2" tab={<span><CarryOutOutlined/> 已完成：{finish}</span>}>
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
