import React from 'react';
import { Button } from 'antd';
import BdpCharts from './bdpCharts';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'bar',
      echartsData: {
        legend: ['event1', 'event2', 'event3'],
        xData: ['2017-09-27', '2017-09-28', '2017-09-29', '2017-09-30'],
        yData: [
          [12759, 12859, 12959, 13059],
          [22759, 22859, 22959, 23059],
          [32759, 32859, 32959, 33059],
        ],
      },
    };
  }
  render() {
    return (
      <div>
        <Button onClick={() => {
          this.setState({ echartsData: {
            legend: ['event1', 'event2', 'event3'],
            xData: ['2017-09-28', '2017-09-29', '2017-09-30', '2017-09-31'],
            yData: [
              [12859, 12959, 13059, 44442],
              [22859, 22959, 23059, 32322],
              [32859, 32959, 33059, 32131],
            ],
          } });
        }}
        >切换数据
        </Button>
        <Button
          type="primary"
          onClick={() => {
          this.setState({ type: 'line' });
        }}
        >折线图
        </Button>
        <Button
          type="primary"
          onClick={() => {
          this.setState({ type: 'bar' });
        }}
        >柱状图
        </Button>
        <Button
          type="primary"
          onClick={() => {
          this.setState({ type: 'pie' });
        }}
        >饼状图
        </Button>
        <BdpCharts id="charts" echartsData={this.state.echartsData} type={this.state.type} />
      </div>
    );
  }
}

export default Index;
