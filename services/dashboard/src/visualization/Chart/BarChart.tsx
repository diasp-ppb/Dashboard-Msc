import React from 'react';
import {
  BarChart as BarChrt, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

interface Props {
  width: number,
  height: number,
  xAxis: boolean,
  yAxis: boolean, 
  tooltip: boolean,
  bars: BarConfig[],
  data: Array<any>,
  legend: boolean,
}

interface Config {
  bars: BarConfig[]
}

export interface BarConfig {
  fill: string,
  dataKey: string,
  stackId?: string,
}


class BarChart extends React.Component <Props, Config> {
  
  _addBars() {
    return this.props.bars.map( (item, index)=> {
            return (
             <Bar fill={item.fill} dataKey={item.dataKey}  key={index}/>
            )
        }
    );
  }

  render(){
      
      return (
        <BarChrt
          width={this.props.width}
          height={this.props.height}
          data={this.props.data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {this.props.xAxis && <XAxis dataKey="name" />}
          {this.props.yAxis && <YAxis /> }
          {this.props.tooltip && <Tooltip /> }
          {this.props.legend && <Legend />}
          {this._addBars()}
        </BarChrt>
      );
  }
}

export default BarChart;
