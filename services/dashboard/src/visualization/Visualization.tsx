import React from 'react'
import { VisualizationProps, Visualization_Types, defaulxAxis } from '../Interfaces';
import MapLeaflet from './Map/MapLeaflet'
import LineChart from './Chart/LineChart';
import BarChart from './Chart/BarChart';
import DataSourceList from './DataSource/DataSourceList';
import MapDeckGL from './Map/MapDeckGL';

class Visualization extends React.Component<VisualizationProps> {


    applyFilters(){
      const filters = this.props.visualizationConfig.filters;
      let data = this.props.data.data;
      
      if(!filters) return;

      let result = data;

      filters.forEach( function(element) {
          result = element.filter(data);
      }
      );
      
      return result;
    }

    getComponent() {
      let type = this.props.visualizationConfig.type;
      let {width, height, visualizationConfig} = this.props;
      
      let filteredData = this.applyFilters();

      
      switch (type) {
        case Visualization_Types.BAR_CHART: {
          console.log(filteredData);
          return <BarChart
            width={width}
            height={height}
            xAxis={visualizationConfig.xAxis || defaulxAxis}
            yAxis={visualizationConfig.yAxis || false}
            tooltip={visualizationConfig.tooltip || false}
            data={filteredData || []}
            bars={visualizationConfig.bars || []}
            legend={visualizationConfig.legend || false}
          />
        }
        case Visualization_Types.MAP_LEAFLET: {
          return <MapLeaflet
          width={width}
          height={height}
          tileLayer={visualizationConfig.tileLayer || false}
          data={filteredData}
          /> 
        }
        case Visualization_Types.MAP_DECK_GL: {
          return <MapDeckGL/> 
        }
        
        case Visualization_Types.LINE_CHART: {
          return  <LineChart 
          width={width}
          height={height}
          xAxis={true}
          yAxis={true}
          tooltip={true}
          legend={false}
          lines={visualizationConfig.lines || []}
          data={filteredData || []}/> 
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