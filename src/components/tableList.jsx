import React from 'react';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {Table, Button, Input} from 'antd';
import {columnsA, columnsB, columnsC} from './tableColumns';
import {getMonitorRecognition, getMonitorFinished, getMonitorHistory} from '../api/cloudRecognition';

export default class TableList extends React.Component {

  state = {
    loading: false,
    list: [],
    columnsList: [
      columnsA,
      columnsB,
      columnsC
    ]
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

  getStaticList = () => {
    return [
      {
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
      const {data} = await this.getTableListData();
      const list = data && data['recognitionList'];
      Object.assign(list, this.getStaticList());
      this.setState({list});
    } catch (e) {
      throw e;
    } finally {
      this.setState({loading: false});
    }
  };

  componentDidMount() {
    this.queryTableList().catch(e => console.log(e));
  }

  render() {
    const {type} = this.props;
    const {list, columnsList, loading} = this.state;
    const columns = columnsList[type];
    return <Table dataSource={list} columns={columns} loading={loading} rowKey={(r, i) => i.toString()}/>;
  }

}
