import React, {useState} from 'react';
import {Popconfirm, Button, message, Tag} from 'antd';
import {getMonitorHistory, updateMonitorPriority} from '../api/cloudRecognition';

export const Action = (props) => {
  const {attrs, reload} = props;

  const handlerPriorityUpdate = (projectId, subjectCode) => {
    return updateMonitorPriority({projectId, subjectCode});
  };

  const handlerPopConfirm = async () => {
    const {projectId, subjectCode} = attrs;
    try {
      await handlerPriorityUpdate(projectId, subjectCode);
      message.success('优先级设置成功');
      reload();
    } catch (err) {
      message.error(err);
    }
  };

  const handlerPopCancel = () => {
    message.info('取消设置优先级');
  };

  return (
    <Popconfirm title="你确认要设置优先级？" okText="确认" cancelText="取消" placement="topRight"
                onConfirm={handlerPopConfirm} onCancel={handlerPopCancel}>
      <Button type="primary" size="small" shape="round" danger>设置优先级</Button>
    </Popconfirm>
  );
};

const getHistoryList = async (projectId, subjectCode, key) => {
  const {data} = await getMonitorHistory({projectId, subjectCode});
  const list = data ? data['recognitionList'] : [];
  list.forEach((item, index) => item.key = `${key}_${index}`);
  return list
};

export const History = (props) => {
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
    <>
      <Tag color="green" style={{margin: '1px'}}>开始动作: {start}</Tag>
      <br/>
      <Tag color="red" style={{margin: '1px'}}>结束动作: {finish}</Tag>
    </>
  );
};
