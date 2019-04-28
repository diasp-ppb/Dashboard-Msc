import React from 'react'
import { Filter, VisualizationConfig, IAppState, Visualization_Types, DataConfig } from '../../Interfaces';
import { FormGroup, HTMLSelect, Divider, Label, ControlGroup, Button, InputGroup } from '@blueprintjs/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Filters from '../../filters/filter';
import { updateVisualizationConfig } from '../../redux/actions/AppActions';

interface Props {
    visualizations: VisualizationConfig[],
    data: DataConfig[],
    updateVisualization: Function,
}

interface State {
    selectedVisualization: string,
    selectedFilter: string,
    filterValue: string,
    selectedDataSet: string,
}

class FilterSelector extends React.Component<Props, State> {
    state: State = {
        selectedVisualization: "",
        selectedFilter: "",
        filterValue: "Fofa",
        selectedDataSet: "",
    }
    getVisualizationsId () {
        let visIds:any[] = [];

        this.props.visualizations.forEach( (vis) => {
            console.log("filter", vis);
            if(vis.type !== Visualization_Types.FILTER_SELECTION && vis.type !== Visualization_Types.DATA_SOURCES) {
                let window = "window " + vis.nodeId;
                visIds.push({label: window,
                             value: vis.nodeId});
            }
        }
        )
        return visIds;
    }


    getFilters() {
        let filters:any[] = [];

        Object.keys(Filters).forEach( (key) => {
            filters.push( {label: key, value: key});    
        })

        return filters;
    }   


    getDatasets() {
        let dataIds:any[] = [];

        this.props.data.forEach( (data) => {
            let dataId = data.dataId;
            dataIds.push({label: dataId, value:dataId})
        });

        return dataIds;
    }

    changeDataset(dataset: string) {
        //TODO
    }

    changeFilter(filterParam: string) {
        this.setState({filterValue: filterParam});


        let visIndex = this.state.selectedVisualization]
        let vis = this.props.visualizations[;
    }
   
    render() {
        let visIds = this.getVisualizationsId();

        return (
            <FormGroup>
                <ControlGroup fill={true} vertical={false}>
                   <Label>
                        Visualization
                        <HTMLSelect  options={visIds} onChange={(event) => {this.setState({selectedVisualization: event.currentTarget.value})}}/>
                    </Label>
                    
                    <Label>
                        Datasource
                        <HTMLSelect  options={this.getDatasets()}  onChange={ (event) => {this.setState({selectedDataSet: event.currentTarget.value})}}/>
                    </Label>

                    <Label>
                        Filter
                        <HTMLSelect  options={this.getFilters()}  onChange={ (event) => {this.setState({selectedFilter: event.currentTarget.value})}}/>
                        <InputGroup
                          disabled={false}
                          large={false}
                          leftIcon="filter"
                          onChange={(event: any) => {this.changeFilter(event.target.value)}}
                          placeholder="Filter histogram..."
                          small={true}
                          value={this.state.filterValue}
                        />
                    </Label> 
                    

                </ControlGroup>
                
            </FormGroup>
        )
    }
}



const mapDispatchToProps = (dispatch: Dispatch) => {
    return {    
     updateVisualization: (vis:VisualizationConfig) => dispatch(updateVisualizationConfig(vis))
    }
  };
  
  const mapStateToProps = (store: IAppState) => {
    const layerId = store.currentLayer;
    return {
      visualizations: store.visualizations[layerId],
      data: store.data,
    };
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(FilterSelector);
