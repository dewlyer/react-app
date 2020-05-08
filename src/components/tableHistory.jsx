import React from 'react';
import {Button, message} from 'antd';
import {getMonitorHistory} from '../api/cloudRecognition';

const History = (props) => {
  const {attrs, index, child} = props;

  const handlerHistoryList = (projectId, subjectCode) => {
    return getMonitorHistory({projectId, subjectCode});
  };

  const handlerHistoryClick = async () => {
    const {projectId, subjectCode} = attrs;
    try {
      const {data} = await handlerHistoryList(projectId, subjectCode);
      const list = data ? data['recognitionList'] : [];
      list.forEach((item, i) => item.key = `${index}_${i}`);
      child(index, list);
    } catch (err) {
      console.log(err);
      message.error(err);
    }
  };

  const {statusWhenFinish, statusWhenStart} = attrs;

  return attrs.children ?
    <Button type="primary" size="small" shape="round" danger onClick={handlerHistoryClick}>查看历史</Button> :
    (<span>
      开始动作: {statusWhenStart}
      <br/>
      结束动作: {statusWhenFinish}
    </span>);
};

export default History;
