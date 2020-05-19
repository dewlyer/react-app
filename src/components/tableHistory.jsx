import React, {useState} from 'react';
import {Button, Tag, message} from 'antd';
import {getMonitorHistory} from '../api/cloudRecognition';

const getHistoryList = async (projectId, subjectCode, key) => {
  const {data} = await getMonitorHistory({projectId, subjectCode});
  const list = data ? data['recognitionList'] : [];
  list.forEach((item, index) => item.key = `${key}_${index}`);
  return list
};

const History = (props) => {
  const {attrs, child} = props;

  const handlerHistoryClick = async () => {
    try {
      const {projectId, subjectCode, key} = attrs;
      const list = await getHistoryList(projectId, subjectCode, key);
      if (typeof child === 'function') {
        child(key, list);
      }
    } catch (err) {
      message.error(err);
    }
  };

  const {statusWhenStart, statusWhenFinish} = attrs;
  const [start] = useState(statusWhenStart);
  const [finish] = useState(statusWhenFinish);

  return attrs.children ? (
    <Button type="primary" size="small" shape="round" danger onClick={handlerHistoryClick}>
      查看历史
    </Button>
  ) : (
    <span>
      <Tag color="green" style={{margin: '1px'}}>开始动作: {start}</Tag>
      <br/>
      <Tag color="red" style={{margin: '1px'}}>结束动作: {finish}</Tag>
    </span>
  );
};

export default History;
