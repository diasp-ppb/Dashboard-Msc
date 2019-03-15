import React from 'react'
import {FormGroup, Switch, NumericInput, Divider, Button} from "@blueprintjs/core";
import { VisualizationConfig } from '../../../../Interfaces';

interface Props {
    updateConfig: Function,
    config: VisualizationConfig,
}

interface State {
    n1: number,
    n2: number,
}

class BarChartConfiguration extends React.Component<Props,State> {

    state:State = {
        n1: 3,
        n2: 3,
    }

    updateStroke(n1:number, n2:number) {
        this.setState({n1: n1, n2: n2});
        
        let {config} = this.props;

        this.props.updateConfig({cartesianGrid: {...config.cartesianGrid, strokeDasharray: n1 + " " + n2 }})
    }

    updateBars(key: number, dataKey: string, fill: string) {
        let bars = this.props.config.bars || [];
        bars = bars.map( (element, index) => {
            if(index === key) {
                return {dataKey, fill};
            }
            else {
                return element;
            }
        } )
        this.props.updateConfig({bars: bars});
    }

    renderBarConfigs() {
        let bars = this.props.config.bars || [];
         return bars.map((element, key) => {
            return (
                <div key={key}>
                    <input
                        placeholder={'dataKey'} 
                        value={element.dataKey}
                        onChange={(event)=> this.updateBars(key, event.target.value, element.fill)}
                    />
                    <input
                        placeholder={'fill'}    
                        value={element['fill']}
                        onChange={(event)=> this.updateBars(key, element.dataKey, event.target.value)}
                    />
                </div>
            );
         });
    }

    addBarConfig = () => {
        let bars = this.props.config.bars || [];
        let newbars = [...bars,  { dataKey: 'uv', fill: "#8884d8"}]
        this.props.updateConfig({bars: newbars});
    }

    render() {
        let {config} = this.props;

        return (
            <FormGroup>
                <Switch checked={config.xAxis} label="xAxis" 
                    onChange={() => this.props.updateConfig( {xAxis: !config.xAxis })}
                />

                <Switch checked={config.yAxis} label="yAxis"
                    onChange={() => this.props.updateConfig( {yAxis: !config.yAxis })} 
                />
                <Switch checked={config.cartesianGrid.active} label="cartesian grid" 
                    onChange={() => this.props.updateConfig({ cartesianGrid: {...config.cartesianGrid, active: !config.cartesianGrid.active}})}
                />
                {config.cartesianGrid.active && 
                  <FormGroup>
                    <NumericInput value={this.state.n1} min={1} onValueChange={(value) => this.updateStroke(value,this.state.n2) }/>
                    <NumericInput value={this.state.n2} min={1} onValueChange={(value) => this.updateStroke(this.state.n1, value)}/>
                  </FormGroup>   
                }
                <Divider/>
                <Button text="Add Bar" onClick={this.addBarConfig}/>
                {this.renderBarConfigs()}
            </FormGroup>
        )
    }
}


export default BarChartConfiguration;