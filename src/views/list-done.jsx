import React from 'react';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Table, Tag} from 'antd';
import {getMonitorFinished} from '../api/cloudRecognition';

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }
];

getMonitorFinished().then(data => {
  console.log(data);
});

export default class extends React.Component {
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

  // 学校名称 待识别数 开始识别时间 结束识别时间 平均识别速度 识别总耗时
  // 长沙市第一中学 800/900 2020-4-26 10:35:27 2020-4-26 11:35:27 每秒10张 1分10秒

  render() {
    const {Column} = Table;
    return (
      <Table dataSource={data}>
        <Column title="First Name" dataIndex="firstName" key="firstName" width="150"/>
        <Column title="Age" dataIndex="age" key="age" width="150"/>
        <Column title="Address" dataIndex="address" key="address" width="150"/>
        <Column
          width="150"
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
                    {tags.map(tag => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
                    <Button style={{marginRight: 16}}>Invite {record.lastName}</Button>
                    <Button>Delete</Button>
                </span>
          )}
        />
      </Table>
    )
  }
}
