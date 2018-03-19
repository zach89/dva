import React from 'react';
import { Icon, Divider } from 'antd';
import List from './list';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selection = this.selection.bind(this);
    this.state = {
      form: {
        select: [],
      },
      data: [{
        key: '1',
        name: 'John Brown',
        age: -32,
        address: 'New York No. 1 Lake Park' }, {
        key: '2',
        name: 'Jim Green',
        disabled: true,
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }],
      columns: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        render: (text, recode) => (
          <span style={{ color: recode.age > 0 ? 'white' : 'red' }}>{recode.age}</span>
        ),
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#">Action 一 {record.name}</a>
            <Divider type="vertical" />
            <a href="#">Delete</a>
            <Divider type="vertical" />
            <a href="#" className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        ),
      }],
    };
  }
  selection(ids, array) {
    const { form } = this.state;
    form.select = array;
    this.setState({ form });
  }
  render() {
    const { data, columns } = this.state;
    return (
      <div>
        <List data={data} columns={columns} selection={this.selection} />
      </div>
    );
  }
}

export default Index;
