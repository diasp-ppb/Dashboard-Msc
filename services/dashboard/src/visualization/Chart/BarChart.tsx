import React from 'react';
import {
  BarChart as BarChrt, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { xAxis } from '../../Interfaces';

interface Props {
  width: number,
  height: number,
  xAxis: xAxis,
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
    let bars =  this.props.bars.map( (item, index)=> {
            return (
             <Bar fill={item.fill} dataKey={item.dataKey}  key={index}/>
            )
        }
    );
    return bars;
  }

  render(){
      const {width, height, data, xAxis, yAxis, legend, tooltip} = this.props;  
  
      return (
        <BarChrt
          width={width}
          height={height}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {(xAxis && xAxis.active) && <XAxis dataKey={xAxis.dataKey} />}
          {yAxis && <YAxis /> }
          {tooltip && <Tooltip /> }
          {legend && <Legend />}
          {this._addBars()}
        </BarChrt>
      );
  }
}

export default BarChart;
