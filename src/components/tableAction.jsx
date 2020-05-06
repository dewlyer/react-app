import React from 'react';
import {Popconfirm, Button} from 'antd';
import {updateMonitorPriority} from '../api/cloudRecognition';

function handlerPriorityUpdate(projectId, subjectCode) {
  updateMonitorPriority({projectId, subjectCode}).then().catch();
}

const Action = (props) => {
  const {text, record} = props;
  return (
    <Popconfirm title="你确认要设置优先级？" okText="确认" cancelText="取消"
                onConfirm={() => console.log('onConfirm')} onCancel={() => console.log('onCancel')}>
      <Button type="primary" size="small" shape="round" danger onClick={() => {
        console.log(text);
        console.log(record);
        const {projectId, subjectCode} = record;
        handlerPriorityUpdate(projectId, subjectCode);
      }}>设置</Button>
    </Popconfirm>
  );
};

export default Action;
