import React from 'react'
import {VisualizationConfig} from '../../../../Interfaces'
import { FormGroup, Switch, Divider, Button, NumericInput, HTMLSelect } from '@blueprintjs/core';
import { LineConfig } from '../../../Chart/LineChart';
import { LineType }  from 'recharts'


const LineTypes = ['basis', 'basisClosed' , 'basisOpen' , 'linear' , 'linearClosed' , 'natural' ,
'monotoneX' , 'monotoneY','monotone' , 'step' , 'stepBefore' , 'stepAfter' ] //TODO MISS CURVEFACTORY 

interface Props {
    updateConfig: Function,
    config: VisualizationConfig,
}

interface State {
    n1: number,
    n2: number,
}
class LineChartConfiguration extends React.Component<Props,State> {

    state:State={
        n1: 3,
        n2: 3,
    }

    addLineConfig = () => {
        let lines = this.props.config.lines || [];
        let newLines = [...lines,  { dataKey: 'uv', stroke: "#8884d8", type: LineTypes[0]}]
        this.props.updateConfig({lines: newLines});
    }

    updateGridStroke(n1:number, n2:number) {
        this.setState({n1: n1, n2: n2});
        
        let {config} = this.props;

        this.props.updateConfig({cartesianGrid: {...config.cartesianGrid, strokeDasharray: n1 + " " + n2 }})
    }

    updateLines(key: number, dataKey: string, stroke: string, type: LineType) {
        let lines = this.props.config.lines || [];
        lines = lines.map( (element, index) => {
            if(index === key) {
                return { dataKey, stroke, type } ;
            }
            else {
                return element;
            }
        } )
        this.props.updateConfig({lines: lines});
    }



    renderLineConfigs() {
        let lines = this.props.config.lines || [];
         return lines.map((element, key) => {
            return (
                <div key={key}>
                    <input
                        placeholder={'dataKey'} 
                        value={element.dataKey}
                        onChange={(event)=> this.updateLines(key, event.target.value, element.stroke, element.type)}
                    />
                    <input
                        placeholder={'stroke'}    
                        value={element['stroke']}
                        onChange={(event)=> this.updateLines(key, element.dataKey, event.target.value, element.type)}
                    />
                    <HTMLSelect options={LineTypes} defaultValue={LineTypes[0]} onChange={ (event:any)=>this.updateLines(key, element.dataKey, element.stroke, event.target.type)}/> 
                </div>
            );
         });
    }

    render() {
            let {xAxis, yAxis,cartesianGrid} = this.props.config;
            let {n1,n2} = this.state;
            return (
                <FormGroup>
                    <Switch checked={xAxis} label="xAxis" 
                        onChange={() => this.props.updateConfig( {xAxis: !xAxis })}
                    />
    
                    <Switch checked={yAxis} label="yAxis"
                        onChange={() => this.props.updateConfig( {yAxis: !yAxis })} 
                    />
                    <Switch checked={cartesianGrid.active} label="cartesian grid" 
                        onChange={() => this.props.updateConfig({ cartesianGrid: {...cartesianGrid, active: !cartesianGrid.active}})}
                    />
                    {cartesianGrid.active && 
                      <FormGroup>
                        <NumericInput value={n1} min={1} onValueChange={(value) => this.updateGridStroke(value, n2) }/>
                        <NumericInput value={n2} min={1} onValueChange={(value) => this.updateGridStroke(n1, value)}/>
                      </FormGroup>   
                    }
                    <Divider/>
                    <Button text="Add Line" onClick={this.addLineConfig}/>
                    {this.renderLineConfigs()}
                </FormGroup>
            )
    }
    
}



export default LineChartConfiguration;