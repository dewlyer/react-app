import React from 'react';
import withSizes from 'react-sizes';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {Table, Button, Input} from 'antd';
import Action from './tableAction';
import History from './tableHistory';
import {
  // getMonitorHistory,
  getMonitorFinished,
  getMonitorRecognition
} from '../api/cloudRecognition';

@withSizes(({height}) => ({windowHeight: height}))
class TableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      loading: false,
      scroll: {y: 600},
      list: [],
    };
    this.columnsList = [
      [
        {
          title: '学校名称',
          dataIndex: 'schoolName',
          key: 'schoolName',
          sorter: this.sortListBySchool,
          ...this.getColumnSearchProps('schoolName')
        },
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
          width: '20%'
        },
        {
          title: '科目名称',
          dataIndex: 'subjectName',
          key: 'subjectName',
          width: '10%'
        },
        {
          title: '待识别数',
          dataIndex: 'taskTotal',
          key: 'taskTotal',
          width: '10%',
          render: this.renderTaskTotal
        },
        {
          title: '开始识别时间',
          dataIndex: 'humanStartTime',
          key: 'humanStartTime',
          width: '12%'
        },
        {
          title: '已耗时间',
          dataIndex: 'totalTime',
          key: 'totalTime',
          width: '10%',
          render: this.renderTotalTime
        },
        {
          title: '优先级',
          dataIndex: 'priority',
          key: 'priority',
          width: '10%'
        },
        {
          title: '操作',
          key: 'Action',
          width: '10%',
          render: this.renderAction
        }
      ],
      [
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
        }
      ],
      [
        {
          title: '学校名称',
          dataIndex: 'schoolName',
          key: 'schoolName',
          sorter: this.sortListBySchool,
          ...this.getColumnSearchProps('schoolName')
        },
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
          width: '15%'
        },
        {
          title: '科目名称',
          dataIndex: 'subjectName',
          key: 'subjectName',
          width: '8%'
        },
        {
          title: '待识别数',
          dataIndex: 'taskTotal',
          key: 'taskTotal',
          width: '10%',
          render: this.renderTaskTotal
        },
        {
          title: '识别次数',
          dataIndex: 'recognitionTimes',
          key: 'recognitionTimes',
          width: '8%'
        },
        {
          title: '开始识别时间',
          dataIndex: 'humanStartTime',
          key: 'humanStartTime',
          width: '12%'
        },
        {
          title: '结束识别时间',
          dataIndex: 'humanEndTime',
          key: 'humanEndTime',
          width: '12%'
        },
        {
          title: '识别总耗时',
          dataIndex: 'totalTime',
          key: 'totalTime',
          width: '8%',
          render: this.renderTotalTime
        },
        {
          title: '状态',
          key: 'Action',
          width: '10%',
          render: this.renderHistory
        }
      ]
    ]
  }

  sortListBySchool = (a, b) => {
    const paramsA = a.schoolId + a.projectId;
    const paramsB = b.schoolId + b.projectId;
    return paramsA.localeCompare(paramsB);
  };

  renderTotalTime = (text) => <span>{text}秒</span>;

  renderTaskTotal = (text, record) => <span>{record['finishedTotal'] || 0} / {text}</span>;

  renderAction = (attrs) => <Action attrs={attrs} reload={this.handlerTableListReload}/>;

  renderHistory = (attrs, record, index) => <History attrs={attrs} index={index} child={this.handlerChildShow}/>;

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
        <Input placeholder="输入学校名称" value={selectedKeys[0]} ref={node => {
          this.searchInput = node;
        }}
               style={{width: 188, marginBottom: 8, display: 'block'}}
               onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}/>
        <Button size="small" type="primary" icon={<SearchOutlined/>} style={{width: 90, marginRight: 8}}
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}>搜索</Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>重置</Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {setTimeout(() => this.searchInput.select());}
    },
    render: text => this.state.searchedColumn === dataIndex ?
      (<Highlighter highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]} textToHighlight={text.toString()}
                    autoEscape/>) : (text)
  });

  getRecognitionList = (res) => {
    const {data} = res;
    return !data ? [] : data['recognitionList'];
  };

  getTableListData = async () => {
    let res, list;
    switch (this.props.type) {
      case 2:
        res = await getMonitorFinished();
        list = this.getRecognitionList(res);
        list.forEach((item, index) => {
          item.key = String(index);
          item.children = [];
        });
        break;
      // case 1:
      //   res = await getMonitorHistory();
      //   break;
      default:
        res = await getMonitorRecognition();
        list = this.getRecognitionList(res);
      // Object.assign(list, this.getStaticList());
    }
    return list;
  };

  getStaticList = () => {
    return [
      {
        "key": "ssss",
        "projectId": "430900-2429577d41c448bfbeeff75632156379",
        "subjectCode": "004005006",
        "projectName": "2020年高中三年级理综考试(5)",
        "subjectName": "理科综合",
        "schoolId": "3424b507-a3cd-42d9-a62e-165939ee35a8",
        "schoolName": "桃江县第四中学",
        "priority": "普通",
        "taskTotal": 757,
        "startTime": 1588817425329,
        "humanStartTime": "2020-05-07 10:10:25",
        "lastRecognitionTime": 1588816675516,
        "humanLastRecognitionTime": "2020-05-07 09:57:55",
        "endTime": 0,
        "humanEndTime": null,
        "statusWhenFinish": null,
        "statusWhenStart": "重新识别",
        "recognitionTimes": 0,
        "totalTime": 0
      }
    ]
  };

  queryTableList = async () => {
    try {
      this.setState({loading: true});
      const list = await this.getTableListData();
      this.setState({list});
    } catch (e) {
      throw e;
    } finally {
      this.setState({loading: false});
    }
  };

  getData = () => {
    this.queryTableList().catch(e => console.log(e));
  };

  handlerTableListReload = () => {
    window.setTimeout(() => {
      this.getData();
    }, 500);
  };

  handlerChildShow = (index, children) => {
    const {list} = this.state;
    list[index].children = children;
    this.setState({list});
  };

  updateScrollData = () => {
    const {windowHeight} = this.props;
    const scroll = {
      y: Math.max(windowHeight - 206 - 85, 300)
    };
    this.setState({scroll})
  };

  resizeListener = () => {
    window.setTimeout(() => {
      this.updateScrollData();
    }, 0)
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.resizeListener();
    this.getData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    const {type} = this.props;
    const {list, loading, scroll} = this.state;
    const columns = this.columnsList[type];
    return <Table
      dataSource={list}
      columns={columns}
      loading={loading}
      expandRowByClick={true}
      indentSize={30}
      scroll={scroll}
      pagination={false}
    />;
  }

}

export default TableList;
