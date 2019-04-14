import React from 'react'
import { Visualization_Types, VisualizationConfig } from '../../../Interfaces';
import BarChartConfiguration from './Configurators/BarChartConfiguration';
import MapConfiguration from './Configurators/MapConfiguration';
import LineChartConfiguration from './Configurators/LineChartConfiguration';

interface Props {
    updateConfig: Function,
    config: VisualizationConfig,
}


class ConfigurationSelector extends React.Component<Props> {

    renderConfigDisplayer() {
        let type = this.props.config.type;
        console.log(type, Visualization_Types.BAR_CHART);
        switch(type) {
            
            case Visualization_Types.BAR_CHART:
                return <BarChartConfiguration updateConfig={this.props.updateConfig} config={this.props.config}/>;
            
            case Visualization_Types.MAP_DECK_GL: 
                return <MapConfiguration updateConfig={this.props.updateConfig} config={this.props.config}/>;
            
            case Visualization_Types.LINE_CHART: 
                return <LineChartConfiguration updateConfig={this.props.updateConfig} config={this.props.config} />;
            
            default: 
                return <p> The selected visualizations does not have a ConfigurationSelector </p>
        }

    }

    render() {
        return this.renderConfigDisplayer();
    }
    
}


export default ConfigurationSelector;