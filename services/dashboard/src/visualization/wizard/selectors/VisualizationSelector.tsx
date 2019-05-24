import React from 'react'

import {Visualization_Types} from "../../../Interfaces"

import { 
    FormGroup,
    HTMLSelect
 } from "@blueprintjs/core";

interface Props {
    visualizationSelected: Visualization_Types,
    selectVisualization: Function,
}

class VisualizationSelector extends React.Component<Props> {

    typesToArray() {
        let types = [];
        for( let type in Visualization_Types){
            types.push(type);
        };
        return types;
    }

    render() {
        let types = this.typesToArray();
        return (
        <FormGroup>
        <h3>Visualization Wizzard</h3>
        
        <div>
            Theme
            
            Recomendations
        </div>

        <div> 
            <HTMLSelect options={types} defaultValue={types[0]} onChange={ (event) => {this.props.selectVisualization(event.currentTarget.value)}}/> 
        </div> 

        </FormGroup>
        );
    }
    
}


export default VisualizationSelector;