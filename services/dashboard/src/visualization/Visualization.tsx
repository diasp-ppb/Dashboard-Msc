import React from 'react'
import { VisualizationProps, Visualization_Types } from '../Interfaces';
import MapLeaflet from './Map/MapLeaflet'
import LineChart from './Chart/LineChart';
import BarChart from './Chart/BarChart';
import DataSourceList from './DataSource/DataSourceList';


class Visualization extends React.Component<VisualizationProps> {


    getComponent() {
      let type = this.props.visualizationConfig.type;
      let data = this.props.visualizationConfig.data;
      switch (type) {
        case Visualization_Types.BAR_CHART: {
          return <BarChart
            width={this.props.width}
            height={this.props.height}
            xAxis={this.props.visualizationConfig.xAxis || false}
            yAxis={this.props.visualizationConfig.yAxis || false}
            tooltip={this.props.visualizationConfig.tooltip || false}
            data={data}
            bars={this.props.visualizationConfig.bars || []}
            legend={this.props. visualizationConfig.legend || false}
          />
        }

        case Visualization_Types.MAP_DECK_GL: {
          return <MapLeaflet
          width={this.props.width}
          height={this.props.height}
          />
        }

        case Visualization_Types.LINE_CHART: {
          return  <LineChart 
          width={this.props.width}
          height={this.props.height}
          xAxis={true}
          yAxis={true}
          tooltip={true}
          lines={
            [
              {
                type: "monotone",
                dataKey: "uv",
                stroke: "#8884d8",
              },
              {
                type: "monotone",
                dataKey: "pv",
                stroke: "#82ca9d"
              }
            ]
          }
          data={data}/> 
        }

        case Visualization_Types.DATA_SOURCES: {
          return <DataSourceList/> 
        }

        default: null
      }
    }

    render() {
        return this.getComponent();  
        
    }

}

export default Visualization;