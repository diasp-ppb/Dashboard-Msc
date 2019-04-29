import React from 'react'
import { Filter, VisualizationConfig, IAppState, Visualization_Types, DataConfig } from '../../Interfaces';
import { FormGroup, HTMLSelect, Divider, Label, ControlGroup, Button, InputGroup } from '@blueprintjs/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { filters, Filters } from '../../filters/filter';
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
        selectedVisualization: '',
        selectedFilter: '',
        filterValue: '',
        selectedDataSet: '',
    }

    getVisualizationsId () {
        let visIds:any[] = [];

        this.props.visualizations.forEach( (vis) => {
            if(vis.type !== Visualization_Types.FILTER_SELECTION && vis.type !== Visualization_Types.DATA_SOURCES) {
                let window = "window " + vis.nodeId;
                visIds.push({label: window,
                             value: vis.nodeId});
            }
        })

        visIds.push({label: 'None',
                     value: ''})

        return visIds;
    }


    getFilters() {
        let filtersOptions:any[] = [];

        Object.keys(filters).forEach( (key) => {
            filtersOptions.push( {label: key, value: key});    
        })

        filtersOptions.push( {label: 'None', value: ''});
        
        return filtersOptions;
    }   


    getDatasets() {
        let dataIds:any[] = [];

        this.props.data.forEach( (data) => {
            let dataId = data.dataId;
            dataIds.push({label: dataId, value:dataId})
        });

        dataIds.push({label: 'None', value: ''})

        return dataIds;
    }

    changeDataset(dataset: string) {
        this.setState({selectedDataSet: dataset});
        let {selectedVisualization} = this.state;

        let vis = this.props.visualizations.find(function(item) {
            console.log("window: " + item.nodeId, "selected:" + selectedVisualization);

            return   item.nodeId.toString() === selectedVisualization;
        })

        if(vis) 
        {
            vis.dataId = dataset;
            console.log("vis", vis);
            this.props.updateVisualization(vis);
        }
        else {
            console.log("notVis");
        }
    }

    changeFilter(filter:string, filterParam: string) {
        this.setState({
            selectedFilter: filter,
            filterValue: filterParam});


        let {selectedVisualization, selectedFilter} = this.state;

        console.log(this.props.visualizations);

        let vis = this.props.visualizations.find(function(item) {
            console.log("window " + item.nodeId, selectedVisualization);
            return  item.nodeId.toString() === selectedVisualization;
        })

        if(vis && selectedFilter in Object.keys(filters)) 
        {
            let filterFunction =  filters[selectedFilter];
            let filter:Filter = {
                filter: filterFunction,
                options: [filterParam],
                result: [],
            }

            vis.filters = [filter];

            this.props.updateVisualization(vis);
        }
    }
   
    render() {
        let visIds = this.getVisualizationsId();
        let datasetIds = this.getDatasets();
        let filters = this.getFilters();
        let {selectedVisualization, selectedFilter, selectedDataSet, filterValue} = this.state;

        return (
            <FormGroup>
                <ControlGroup fill={true} vertical={false}>
                   <Label>
                        Visualization
                        <HTMLSelect  value={selectedVisualization} options={visIds} onChange={(event) => {this.setState({selectedVisualization: event.currentTarget.value})}}/>
                    </Label>
                    
                    <Label>
                        Datasource
                        <HTMLSelect  value={selectedDataSet} options={datasetIds}  onChange={ (event) => {this.changeDataset(event.currentTarget.value)}}/>
                    </Label>

                    <Label>
                        Filter
                        <HTMLSelect  value={selectedFilter} options={filters}  onChange={ (event) => {this.changeFilter(event.currentTarget.value, filterValue)}}/>
                        <InputGroup
                          disabled={false}
                          large={false}
                          leftIcon="filter"
                          onChange={(event: any) => {this.changeFilter(selectedFilter, event.target.value)}}
                          placeholder="Filter histogram..."
                          small={true}
                          value={filterValue}
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
