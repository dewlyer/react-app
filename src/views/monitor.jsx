import React from 'react';
import './monitor.scss';
import {
  // TeamOutlined,
  SnippetsOutlined,
  CarryOutOutlined
} from '@ant-design/icons';
import {Layout, Badge, Tabs, BackTop} from 'antd';
import TableList from '../components/tableList';
import {getMonitorInfo} from '../api/cloudRecognition';

export default class Monitor extends React.Component {

  state = {
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
    const {contentStyle, info} = this.state;
    const {Content} = Layout;
    const {TabPane} = Tabs;
    const {
      recognitionTotalOneMinuteBefore: speed = 0,
      recognitionSubjectTotal: process = 0,
      finishedSubjectTotal: finish = 0
    } = info;
    return (
      <Content style={contentStyle}>
        <div className="monitor-info">
          <span>系统识别总速度：</span>
          <Badge count={speed} style={{backgroundColor: '#1990fe'}} showZero/>
          <span> 张每分钟</span>
        </div>
        <Tabs defaultActiveKey="0">
          <TabPane key="0" tab={<span><SnippetsOutlined/> 识别中：{process}</span>}>
            <TableList type={0}/>
          </TabPane>
          {/*<TabPane key="1" tab={<span><TeamOutlined/> 排队中：{speed}</span>}>
            <TableList type={1}/>
          </TabPane>*/}
          <TabPane key="2" tab={<span><CarryOutOutlined/> 已完成：{finish}</span>}>
            <TableList type={2}/>
          </TabPane>
        </Tabs>
        <BackTop/>
      </Content>
    );
  }

}
