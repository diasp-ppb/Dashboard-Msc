import React from 'react'
import { VisualizationsAvailable } from '../../../Interfaces';
import BarChartConfiguration from './Configurators/BarChartConfiguration';
import MapConfiguration from './Configurators/MapConfiguration';
import LineChartConfiguration from './Configurators/LineChartConfiguration';

interface Props {
    updateConfig: Function,
    config: any,
}


class ConfigurationSelector extends React.Component<Props> {

    renderConfigDisplayer() {
        let type = this.props.config.type.type;
        return type ===  VisualizationsAvailable[0].type ? <BarChartConfiguration updateConfig={this.props.updateConfig} config={this.props.config}/> : 
               type ===  VisualizationsAvailable[1].type ? <MapConfiguration updateConfig={this.props.updateConfig} config={this.props.config}/>:
               type ===  VisualizationsAvailable[2].type ? <LineChartConfiguration updateConfig={this.props.updateConfig} config={this.props.config} /> :
               null;
    }

    render() {
        return this.renderConfigDisplayer();
    }
    
}


export default ConfigurationSelector;