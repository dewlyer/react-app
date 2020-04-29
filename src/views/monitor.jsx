import React from 'react';
import {Row, Col, Divider, Button, ConfigProvider, DatePicker, message} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      style: {
        background: '#0092ff',
        padding: '8px 0'
      }
    };
  }


  handleChange = date => {
    message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
    this.setState({date});
  };


  render() {
    const {style, date} = this.state;
    return (
      <>
        <Button type="primary">Button</Button>
        <ConfigProvider locale={zhCN}>
          <div style={{width: 400, margin: '100px auto'}}>
            <DatePicker onChange={this.handleChange}/>
            <div style={{marginTop: 20}}>
              当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
            </div>
          </div>
        </ConfigProvider>

        <Divider orientation="left" style={{color: '#333', fontWeight: 'normal'}}>
          Horizontal
        </Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left" style={{color: '#333', fontWeight: 'normal'}}>
          Responsive
        </Divider>
        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left" style={{color: '#333', fontWeight: 'normal'}}>
          Vertical
        </Divider>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </>
    )
  };
}
