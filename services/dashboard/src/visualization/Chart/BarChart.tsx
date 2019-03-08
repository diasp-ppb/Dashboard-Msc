import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import types from 'recharts'

interface Props {
  width: number,
  height: number,
  xAxis: boolean,
  yAxis: boolean, 
  tooltip: boolean,
  lines: LineConfig[],
  data: Array<any>,
}

interface Config {
  lines: LineConfig[]
}

export interface LineConfig {
  type: types.LineType,
  dataKey: string,
  stroke: string,
}


class BarChart extends React.Component <Props, Config> {


  constructor(props:Props) {
    super(props);
    this.state = {
      lines: props.lines,
    }

  }
  
  _addLines() {
    console
    return (
        this.state.lines.map( (item, index)=> {
          return (
            <Line type={item.type} dataKey={item.dataKey} stroke={item.stroke} key={index}/>
          )
        }
      )
    );
  }

  render(){

      //Lines 

      
      return (
        <LineChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {this._addLines()}
        </LineChart>
      );
  }
}

export default BarChart;
