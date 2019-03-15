import React from 'react'
import { VisualizationProps } from '../Interfaces';
import Map from './Map/Map'
import {VisualizationsAvailable} from '../Interfaces'
import LineChart from './Chart/LineChart';
import BarChart from './Chart/BarChart';


class Visualization extends React.Component<VisualizationProps> {

    renderChart() {
        let type = this.props.visualizationConfig.type.type;
        let data = this.props.visualizationConfig.data;

        let vis = (type === VisualizationsAvailable[0].type) ?
          <BarChart
            width={this.props.width}
            height={this.props.height}
            xAxis={this.props.visualizationConfig.xAxis || false}
            yAxis={this.props.visualizationConfig.yAxis || false}
            tooltip={this.props.visualizationConfig.tooltip || false}
            data={data}
            bars={this.props.visualizationConfig.bars || []}
            legend={this.props. visualizationConfig.legend || false}
          />
        : 
        (type === VisualizationsAvailable[1].type) ?
        <Map
          width={this.props.width}
          height={this.props.height}
        />
        : 
        (type === VisualizationsAvailable[2].type) ?
        <LineChart 
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

        : null

        ;
        
        return (
            vis
        );
    }

    render() {
        return (  
                this.renderChart()    
        );
    }

}




export default Visualization;