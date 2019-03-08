import React from 'react'
import { VisualizationProps } from '../Interfaces';
import BarChart from './Chart/BarChart';

class Visualization extends React.Component<VisualizationProps> {

    renderChart() {

        let barchart = (this.props.type === 'Barchart') ?
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
        : null;
                
        return (
            barchart
        );
    }

    render() {
        return ( 
           <div>  
                {this.renderChart()}    
           </div>
        );
    }

}


export default Visualization;