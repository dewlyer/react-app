import React from 'react';
import './monitor.scss';
import {
  // TeamOutlined,
  SnippetsOutlined,
  CarryOutOutlined
} from '@ant-design/icons';
import {Layout, message, Tabs, BackTop} from 'antd';
import MonitorInfo from '../components/monitorInfo';
import TableList from '../components/tableList';
import {getMonitorInfo} from '../api/cloudRecognition';

export default class Monitor extends React.Component {

  state = {
    key: 0,
    contentStyle: {
      margin: '0 50px',
      padding: '15px 25px'
    },
    info: {}
  };

  queryTableListInfo = async () => {
    try {
      const {data} = await getMonitorInfo();
      this.setState({info: data});
    } catch (e) {
      throw e;
    }
  };

  updateInfoData = () => {
    this.queryTableListInfo().catch(res => {
      const data = {res};
      if (data && data.message) {
        message.error(data.message);
      }
    });
  };

  updateInfoKey = () => {
    let {key} = this.state;
    key++;
    this.setState({key});
  };

  componentDidMount() {
    this.updateInfoData();
    window.setInterval(() => {
      this.updateInfoData();
      this.updateInfoKey();
    }, 60000);
  }

  render() {
    const {contentStyle, info, key} = this.state;
    const {Content} = Layout;
    const {TabPane} = Tabs;
    const {
      recognitionSubjectTotal: process = 0,
      finishedSubjectTotal: finish = 0
    } = info;
    return (
      <Content style={contentStyle}>
        <MonitorInfo info={info}/>
        <Tabs defaultActiveKey="0">
          <TabPane key="0" tab={<span><SnippetsOutlined/> 识别中：{process}</span>}>
            <TableList type={0} key={`process_${key}`}/>
          </TabPane>
          {/*<TabPane key="1" tab={<span><TeamOutlined/> 排队中：{speed}</span>}>
            <TableList type={1}/>
          </TabPane>*/}
          <TabPane key="2" tab={<span><CarryOutOutlined/> 已完成：{finish}</span>}>
            <TableList type={2} key={`finish_${key}`}/>
          </TabPane>
        </Tabs>
        <BackTop/>
      </Content>
    );
  }

}
