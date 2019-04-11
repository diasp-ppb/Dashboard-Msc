import React from 'react';
import {
  LineChart as LineChrt, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import types from 'recharts'

interface Props {
  width: number,
  height: number,
  xAxis: boolean,
  yAxis: boolean, 
  tooltip: boolean,
  legend: boolean,
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


class LineChart extends React.Component <Props, Config> {


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
      return (
        <LineChrt
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
          {this._addLines()}
        </LineChrt>
      );
  }
}

export default LineChart;
