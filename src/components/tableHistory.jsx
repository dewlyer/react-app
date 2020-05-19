import React from 'react';
import {Button, Tag, message} from 'antd';
import {getMonitorHistory} from '../api/cloudRecognition';

const History = (props) => {
  const {attrs, child} = props;

  const handlerHistoryList = (projectId, subjectCode) => {
    return getMonitorHistory({projectId, subjectCode});
  };

  const handlerHistoryClick = async () => {
    const {projectId, subjectCode, key} = attrs;
    try {
      const {data} = await handlerHistoryList(projectId, subjectCode);
      const list = data ? data['recognitionList'] : [];
      list.forEach((item, index) => item.key = `${key}_${index}`);
      child(key, list);
    } catch (err) {
      console.log(err);
      message.error(err);
    }
  };

  const {statusWhenFinish, statusWhenStart} = attrs;

  return attrs.children ? (
    <Button type="primary" size="small" shape="round" danger onClick={handlerHistoryClick}>
      查看历史
    </Button>
  ) : (
    <span>
      <Tag color="green" style={{margin: '1px'}}>开始动作: {statusWhenStart}</Tag>
      <br/>
      <Tag color="red" style={{margin: '1px'}}>结束动作: {statusWhenFinish}</Tag>
    </span>
  );
};

export default History;
