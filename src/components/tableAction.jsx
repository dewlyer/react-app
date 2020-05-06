import React from 'react';
import {Popconfirm, Button} from 'antd';
import {updateMonitorPriority} from '../api/cloudRecognition';

function handlerPriorityUpdate(projectId, subjectCode) {
  updateMonitorPriority({projectId, subjectCode}).then().catch();
}

const Action = (props) => {
  const {text, record} = props;
  return (
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No"
                onConfirm={() => console.log('onConfirm')} onCancel={() => console.log('onCancel')}>
      <Button type="primary" onClick={() => {
        console.log(text);
        console.log(record);
        const {projectId, subjectCode} = record;
        handlerPriorityUpdate(projectId, subjectCode);
      }}>设置</Button>
    </Popconfirm>
  );
};

export default Action;
