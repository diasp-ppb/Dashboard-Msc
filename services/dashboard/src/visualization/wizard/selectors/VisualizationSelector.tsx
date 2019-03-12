import React from 'react'

import {
filterVisualization,
renderVisualization,
VisualizationsAvailable,
VisualizationAvailable
} from "../../../Interfaces"

import { Select } from "@blueprintjs/select";

import { 
    FormGroup,
    Button
 } from "@blueprintjs/core";

interface Props {
    visualizationSelected: VisualizationAvailable,
    selectVisualization: Function,
}

class VisualizationSelector extends React.Component<Props> {


    render() {
        const VisualizationSelect = Select.ofType<VisualizationAvailable>();

        return (
        <FormGroup>
        <h3>Visualization Wizzard</h3>
        <VisualizationSelect
                items={VisualizationsAvailable}
                itemPredicate={filterVisualization}
                itemRenderer={renderVisualization}
                onItemSelect={ (item) => {this.props.selectVisualization(item);} }
                filterable={false}
                >
                <Button
                    icon="gantt-chart"
                    rightIcon="caret-down"
                    text={this.props.visualizationSelected ? `${this.props.visualizationSelected.type}` : "(No selection)"}
                />
        </VisualizationSelect>
        </FormGroup>
        );
    }
    
}


export default VisualizationSelector;