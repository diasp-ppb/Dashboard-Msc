import React from 'react'
import { Filter, VisualizationConfig } from '../../Interfaces';
import { FormGroup, HTMLSelect } from '@blueprintjs/core';
import Visualization from '../Visualization';


interface Props {
    visualizations: VisualizationConfig[],
}

interface State {
    selectedVisualization: number,
}

class FilterSelector extends React.Component<Props, State> {
    state: State = {
        selectedVisualization: 0,
    }

    renderFilters() {

    }   

    addFilter() {

    }

    renderVisConfig() {

        return (
            <div>
                <HTMLSelect  options={["vis1","vis2"]} onChange={(event) => {}}/>
                <HTMLSelect  options={["dat1", "data2"]}  onChange={ (event) => {}}/>
            </div>

            <div>
                
            </div>
        );
    }

    render() {
        return (
            <FormGroup>
                {this.renderVisConfig()}
            </FormGroup>
        )
    }
}

export default FilterSelector;