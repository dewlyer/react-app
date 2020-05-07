import React from 'react';
import {Popconfirm, Button, message} from 'antd';
import {updateMonitorPriority} from '../api/cloudRecognition';

function handlerPriorityUpdate(projectId, subjectCode) {
  return updateMonitorPriority({projectId, subjectCode});
}

function handlerPopConfirm(attrs, reload) {
  const {projectId, subjectCode} = attrs;
  handlerPriorityUpdate(projectId, subjectCode)
    .then(() => {
      message.success('优先级设置成功');
      reload()
    })
    .catch(err => {
      console.log(err);
      message.error(err);
    });
}

function handlerPopCancel() {
  message.info('取消设置优先级');
}

const Action = (props) => {
  const {attrs, reload} = props;
  return (
    <Popconfirm title="你确认要设置优先级？" okText="确认" cancelText="取消" placement="topRight"
                onConfirm={() => handlerPopConfirm(attrs, reload)}
                onCancel={handlerPopCancel}>
      <Button type="primary" size="small" shape="round" danger>设置</Button>
    </Popconfirm>
  );
};

export default Action;
