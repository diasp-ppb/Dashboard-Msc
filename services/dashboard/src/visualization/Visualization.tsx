import React from 'react'
import { VisualizationProps, Visualization_Types, defaulxAxis, defaultRegion, Filter} from '../Interfaces';
import MapLeaflet from './Map/MapLeaflet'
import LineChart from './Chart/LineChart';
import BarChart from './Chart/BarChart';
import DataSourceList from './DataSource/DataSourceList';
import MapDeckGL from './Map/MapDeckGL';
import FilterSelector  from './Filter/FilterSelector';
import Heatmap from './Map/HeatMap';
export default class Visualization extends React.Component<VisualizationProps> {


    applyFilters(){
      const filters = this.props.visualizationConfig.filters;
      
      if(!filters)
      {
        if(!this.props.data)
        {
          console.log("Visualization", this.props.visualizationConfig.nodeId);
          return;
        }
        else 
        {
          console.log(this.props.visualizationConfig.nodeId + " nothing to do: filters");

          return this.props.data.data;
        }
      } 
      console.log(this.props.visualizationConfig.nodeId + " applying: filters");

      let result = this.props.data.data;

      filters.forEach( function(element: Filter) {
         console.log("filter", element);
         if(element && element.filter)
            result = element.filter(result, element.options);
      }
      );

      return result;
    }

    getComponent() {
      let type = this.props.visualizationConfig.type;
      let {width, height, visualizationConfig} = this.props;
      
      let filteredData = this.applyFilters();
      
      console.log("Filtered Data:", filteredData);
      
      switch (type) {
        case Visualization_Types.BAR_CHART: {
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
          tileLayer={ true }//visualizationConfig.tileLayer || false}
          data={filteredData || defaultRegion}
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

        case Visualization_Types.FILTER_SELECTION: {
          return <FilterSelector/>
        }

        case Visualization_Types.HEAT_MAP_LEAFLET: {
          return <Heatmap 
                     width={width}
                     height={height*1.07}
                  />
        }

        default: null
      }
    }

    render() {
        return this.getComponent();  
        
    }

}
