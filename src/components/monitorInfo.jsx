import React from 'react';
import {Tag, Badge} from 'antd';

const MonitorInfo = (props) => {
  const {info} = props;
  const {
    recognitionTotalOneMinuteBefore: speed = 0,
    // 未保存数量
    waitForSaveTotal,
    // 待识别普通批次
    commonRemainderBatch,
    // 待识别优先批次
    priorityRemainderBatch,
    // 待识别慢速批次
    slowRemainderBatch
  } = info;

  return (
    <div className="monitor-info">
      <Tag color="#f50" className="item">未保存数量：{waitForSaveTotal}</Tag>
      <Tag color="#2db7f5" className="item">待识别普通批次：{commonRemainderBatch}</Tag>
      <Tag color="#87d068" className="item">待识别优先批次：{priorityRemainderBatch}</Tag>
      <Tag color="#eab04c" className="item">待识别慢速批次：{slowRemainderBatch}</Tag>
      <span>系统识别总速度：</span>
      <Badge count={speed} overflowCount={9999} style={{backgroundColor: '#1990fe'}} showZero/>
      <span> 张每分钟</span>
    </div>
  );
};

export default MonitorInfo;
