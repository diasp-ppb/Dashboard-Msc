import React from 'react'
import { VisualizationProps } from '../Interfaces';
import BarChart from './Chart/BarChart';
import Map from './Map/Map'
import {VisualizationsAvailable} from '../Interfaces'

class Visualization extends React.Component<VisualizationProps> {

    renderChart() {

        let vis = (this.props.type === VisualizationsAvailable[0].type) ?
        <BarChart 
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
                    data={this.props.data}/>
        : 
        (this.props.type === VisualizationsAvailable[1].type) ?
        <Map
          width={this.props.width}
          height={this.props.height}
        />
        : 
        null
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