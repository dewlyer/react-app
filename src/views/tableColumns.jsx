import React from 'react';

const columnsA = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    key: 'schoolName',
    width: 150,
  },
  {
    title: '待识别数',
    dataIndex: 'taskTotal',
    key: 'taskTotal',
    width: 150,
  },
  {
    title: '开始识别时间',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 150,
  },
  {
    title: '结束识别时间',
    dataIndex: 'endTime',
    key: 'endTime',
    width: 150,
  },
  {
    title: '平均识别速度',
    dataIndex: 'recognitionTimes',
    key: 'recognitionTimes',
    width: 150,
  },
  {
    title: '识别总耗时',
    dataIndex: 'priority',
    key: 'priority',
  },
];
const columnsB = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    key: 'schoolName',
    width: 150,
  },
  {
    title: '待识别数',
    dataIndex: 'taskTotal',
    key: 'taskTotal',
    width: 150,
  },
  {
    title: '开始识别时间',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 150,
  },
  {
    title: '结束识别时间',
    dataIndex: 'endTime',
    key: 'endTime',
    width: 150,
  },
  {
    title: '平均识别速度',
    dataIndex: 'recognitionTimes',
    key: 'recognitionTimes',
    width: 150,
  },
  {
    title: '识别总耗时',
    dataIndex: 'priority',
    key: 'priority',
  },
];
const columnsC = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    key: 'schoolName',
    sorter: true
  },
  {
    title: '待识别数',
    dataIndex: 'taskTotal',
    key: 'taskTotal',
    width: '10%'
  },
  {
    title: '开始识别时间',
    dataIndex: 'humanStartTime',
    key: 'humanStartTime',
    width: '18%'
  },
  {
    title: '结束识别时间',
    dataIndex: 'humanEndTime',
    key: 'humanEndTime',
    width: '18%'
  },
  {
    title: '平均识别速度',
    dataIndex: 'recognitionTimes',
    key: 'recognitionTimes',
    render: text => <span>每秒{text}张</span>,
    width: '15%'
  },
  {
    title: '识别总耗时',
    dataIndex: 'lastRecognitionTime',
    key: 'lastRecognitionTime',
    width: '15%'
  },
];

export {
  columnsA, columnsB, columnsC
}

// projectId: "430100-713f84f9eb4b474fb9c79b333359709a"
// subjectCode: "204007"
// projectName: "蔡江华测试"
// subjectName: "语文政治"
// schoolId: "fcb9e05e-e4b5-4065-8084-f253af5c2905"
// schoolName: "中南迅智一中测试"
// priority: null
// taskTotal: 9
// startTime: "2020-04-30 14:08:08"
// lastRecognitionTime: "2020-04-30 14:08:15"
// endTime: "2020-04-30 14:08:15"
// statusWhenFinish: "识别完成"
// statusWhenStart: "重新识别"
// recognitionTimes: 1