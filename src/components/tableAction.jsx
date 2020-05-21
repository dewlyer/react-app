import React from 'react';
import {Popconfirm, Button, message} from 'antd';
import {updateMonitorPriority} from '../api/cloudRecognition';

const Action = (props) => {
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

export default Action;
