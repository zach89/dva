import React from 'react';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

class BdpCharts extends React.Component {
  constructor(props) {
    super(props);
    this.drawLine = this.drawLine.bind(this);
    this.drawPie = this.drawPie.bind(this);
    this.state = {
      num: 1,
      myCharts: '',
    };
  }
  /* eslint-disable react/no-did-mount-set-state */
  async componentDidMount() {
    if (!this.props.id) return;
    const myCharts = echarts.init(document.getElementById(this.props.id));
    await this.setState({ myCharts });
    // console.log(myCharts);
  }
  componentDidUpdate() {
    if (this.props.type && this.props.type === 'pie') {
      this.drawPie();
    } else {
      this.drawLine();
    }
  }
  drawLine() {
    const { echartsData, type } = this.props;
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: 'bottom',
        data: echartsData.legend,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: [{
        type: 'category',
        boundrayGap: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            opacity: 0,
          },
        },
        data: echartsData.xData,
      }],
      yAxis: [{
        type: 'value',
        scale: true,
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: '#ddd',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            opacity: 0,
          },
        },
      }],
      series: [],
    };
    echartsData.yData.forEach((v, i) => {
      const obj = {
        name: echartsData.legend[i],
        symbol: 'none',
        type,
        smooth: true,
        barWidth: (function barWidth() {
          return `${50 / echartsData.legend.length}%`;
        }()),
        itemStyle: {
          normal: {
            barBorderRadius: [10, 10, 0, 0],
            color: (function color() {
              const index = i % 3;
              const colorList = ['#007DFD', '#FF6E72', '#FFC751', '#16C2AF', '#6546B1', '#214E9F', '#6FE621', '4FCCFF', '#EF463C', '#785549'];
              return colorList[index];
            }()),
          },
        },
        lineStyle: {
          normal: {
            width: 3,
            color: (function color() {
              const index = i % 3;
              const colorList = ['#007DFD', '#FF6E72', '#FFC751', '#16C2AF', '#6546B1', '#214E9F', '#6FE621', '4FCCFF', '#EF463C', '#785549'];
              return colorList[index];
            }()),
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
        data: v,
      };
      option.series.push(obj);
      // this.option.showLoading();
    });
    this.state.myCharts.setOption(option, true);
  }
  drawPie() {
    const { echartsData } = this.props;
    const pieData = [];
    echartsData.yData.forEach((v, i) => {
      let value = 0;
      v.forEach((vv) => {
        value += vv;
      });
      pieData.push({
        name: echartsData.legend[i],
        value,
      });
    });
    const series = {
      type: 'pie',
      radius: [0, '85%'],
      center: ['50%', '50%'],
      roseType: 'radius',
      color: ['#007DFD', '#FF6E72', '#FFC751', '#16C2AF', '#6546B1', '#214E9F', '#6FE621', '4FCCFF', '#EF463C', '#785549'],
      data: pieData,
      label: {
        normal: {
          textStyle: {
            fontSize: 14,
          },
          formatter(param) {
            return `${param.name}:\n${Math.round(param.percent)}%`;
          },
        },
      },
      labelLine: {
        normal: {
          smooth: true,
          lineStyle: {
            width: 2,
          },
        },
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
        },
      },
    };
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        top: 'bottom',
        data: echartsData.legend,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '12%',
        containLabel: true,
      },
      series,
    };
    this.state.myCharts.setOption(option, true);
    // return option;
  }
  render() {
    return (
      <div id={this.props.id} style={{ height: this.props.height ? this.props.height : '300px' }}>hello world! {this.state.num}</div>
    );
  }
}

export default BdpCharts;

