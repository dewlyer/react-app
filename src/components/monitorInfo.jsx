import React, {useState, useEffect} from 'react';
import {Tag, Badge} from 'antd';

const getInfoNumbers = (info) => {
  const {
    recognitionTotalOneMinuteBefore: speed = 0,
    commonRemainderBatch: normal = 0, // 待识别普通批次
    priorityRemainderBatch: fast = 0, // 待识别优先批次
    slowRemainderBatch: slow = 0,     // 待识别慢速批次
    waitForSaveTotal: save = 0        // 未保存数量
  } = info;
  return {
    speed, normal, fast, slow, save
  }
};

const MonitorInfo = (props) => {
  const {info} = props;
  const [speed, setSpeed] = useState(0);
  const [batchNormal, setBatchNormal] = useState(0);
  const [batchFast, setBatchFast] = useState(0);
  const [batchSlow, setBatchSlow] = useState(0);
  const [save, setSave] = useState(0);


  useEffect(() => {
    const {speed, normal, fast, slow, save} = getInfoNumbers(info);
    setSpeed(speed);
    setBatchNormal(normal);
    setBatchFast(fast);
    setBatchSlow(slow);
    setSave(save)
  }, [info]);

  return (
    <div className="monitor-info">
      <span>识别总速度：</span>
      <Badge count={speed} overflowCount={9999} style={{backgroundColor: '#1990fe'}} showZero/>
      <span> 张 / 分钟</span>
      <Tag color="#87d068" className="item">待识别优先批次：{batchFast}</Tag>
      <Tag color="#2db7f5" className="item">待识别普通批次：{batchNormal}</Tag>
      <Tag color="#eab04c" className="item">待识别慢速批次：{batchSlow}</Tag>
      <Tag color="#f50" className="item">未保存数量：{save}</Tag>
    </div>
  );
};

export default MonitorInfo;
