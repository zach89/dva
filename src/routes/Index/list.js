import React from 'react';
import { Table } from 'antd';

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: record => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };
class List extends React.Component {
  constructor(props) {
    super(props);
    this.selection = this.selection.bind(this);
  }
  selection() {
    const { selection } = this.props;
    if (selection) {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          selection(selectedRowKeys, selectedRows);
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.disabled, // Column configuration not to be checked
          name: record.name,
        }),
      };
    } else {
      return null;
    }
  }
  render() {
    const { data, columns } = this.props;
    return (
      <Table
        columns={columns}
        rowSelection={this.selection()}
        dataSource={data}
      />
    );
  }
}

export default List;
