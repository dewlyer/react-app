import React from 'react';
import {Layout, Table, Tag, Row, Col, Divider, Button, ConfigProvider, PageHeader, DatePicker, message} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';

const {Column, ColumnGroup} = Table;

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
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchText: '',
    searchedColumn: '',
    date: null,
    style: {
      background: '#0092ff',
      padding: '8px 0'
    }
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

  handleChange = date => {
    message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
    this.setState({date});
  };

  render() {
    const {Header, Footer, Sider, Content} = Layout;
    const {style, date} = this.state;
    return (
      <>
        <Layout>
          <Header>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="Title"
              subTitle="This is a subtitle"
            />
          </Header>
          <Content>
            <Table dataSource={data}>
              <ColumnGroup title="Name">
                <Column title="First Name" dataIndex="firstName" key="firstName"/>
                <Column title="Last Name" dataIndex="lastName" key="lastName"/>
              </ColumnGroup>
              <Column title="Age" dataIndex="age" key="age"/>
              <Column title="Address" dataIndex="address" key="address"/>
              <Column
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
                    <a style={{marginRight: 16}}>Invite {record.lastName}</a>
                    <a>Delete</a>
                </span>
                )}
              />
            </Table>
            <Divider orientation="left" style={{color: '#333', fontWeight: 'normal'}}>
              Responsive
            </Divider>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
              </Col>
            </Row>
          </Content>
          <Footer>
            <Button type="primary">Button</Button>
            <ConfigProvider locale={zhCN}>
              <div style={{width: 400, margin: '100px auto'}}>
                <DatePicker onChange={this.handleChange}/>
                <div style={{marginTop: 20}}>
                  当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
                </div>
              </div>
            </ConfigProvider>
          </Footer>
        </Layout>
      </>
    )
  };
}
