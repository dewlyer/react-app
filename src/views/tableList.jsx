import React from 'react';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Table} from 'antd';
import {
  getMonitorRecognition,
  getMonitorFinished,
  getMonitorHistory
} from '../api/cloudRecognition';

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
    key: 'schoolName'
  },
  {
    title: '待识别数',
    dataIndex: 'taskTotal',
    key: 'taskTotal',
    width: '10%'
  },
  {
    title: '开始识别时间',
    dataIndex: 'startTime',
    key: 'startTime',
    width: '18%'
  },
  {
    title: '结束识别时间',
    dataIndex: 'endTime',
    key: 'endTime',
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

export default class TableList extends React.Component {
  state = {
    list: [],
    columnsList: [columnsA, columnsB, columnsC]
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({searchText: ''});
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined/>}
          size="small"
          style={{width: 90, marginRight: 8}}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  getTableListData = async () => {
    switch (this.props.type) {
      case 2:
        return await getMonitorFinished();
      case 1:
        return await getMonitorHistory();
      default:
        return await getMonitorRecognition();
    }
  };

  queryTableList = async () => {
    try {
      const {data} = await this.getTableListData();
      const list = data && data['recognitionList'];
      console.log(list);
      this.setState({list});
    } catch (e) {
      throw e;
    }
  };

  componentDidMount() {
    this.queryTableList().catch(e => console.log(e));
  }

  render() {
    const {type} = this.props;
    const {list, columnsList} = this.state;
    const columns = columnsList[type];
    return <Table dataSource={list} columns={columns} rowKey={(r, i) => i.toString()}/>;
  }
}
