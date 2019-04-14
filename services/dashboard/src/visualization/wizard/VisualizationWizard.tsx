import React from 'react';
import DataSelector from './selectors/DataSelector'
import ConfigurationSelector from './selectors/ConfigurationSelector'
import VisualizationSelector from './selectors/VisualizationSelector'
import {Dialog, Navbar, Tab, Tabs, Button, ButtonGroup ,Alignment} from "@blueprintjs/core";
import { Classes } from '@blueprintjs/core';
import { Visualization_Types, VisualizationConfig, defaulxAxis } from "../../Interfaces"

interface VisualizationWizardProps {
    isOpen: boolean,
    closeWizard: Function,
    addVisualization: Function,
}

interface State {
    activePanelOnly: boolean,
    animate: boolean,
    navbarTabId: string,
    vertical: boolean,
    visualizationConfig: VisualizationConfig,

}

const initialState = {
    activePanelOnly: false,
    animate: true,
    vertical: false,
    navbarTabId: "visualization",
    visualizationConfig: {
        type: Visualization_Types.BAR_CHART,
        dataId: "",
        nodeId: -1,
        xAxis: defaulxAxis,
        yAxis: false,
        cartesianGrid: {
            active: false,
            strokeDasharray: "3 3"
        }
    },
}


class VisualizationWizard extends React.Component<VisualizationWizardProps, State> {

    state: State = initialState;

    resetState  = () => { this.setState(initialState); }

    handleNavbarTabChange = (navbarTabId: string) => this.setState({ navbarTabId });

    renderPanel() {
        let panel = this.state.navbarTabId;
        return panel === "visualization" ?
                     <VisualizationSelector 
                        visualizationSelected={this.state.visualizationConfig.type}
                        selectVisualization={this.selectVisualization}
                     /> 
                     :  
                     panel === "configuration" ?  
                     <ConfigurationSelector updateConfig={this.updateVisualizationConfig} config={this.state.visualizationConfig}/> 
                     : <DataSelector selectData={this.selectDataId}/>;
    }

    selectDataId = (item: string) => {
        this.setState( (state) => {
            let visualizationConfig = {...state.visualizationConfig, dataId: item}
            return {...state, visualizationConfig};
        })
    } 
    selectVisualization = (item: Visualization_Types) => { 
        this.setState( (state) => 
            {
                let visualizationConfig = {...state.visualizationConfig, type: item}
                return {...state, visualizationConfig};
            })
    }

    handleClose = () => {this.props.closeWizard()}
    
    handleAddVisualization = () => {
        this.props.addVisualization(this.state.visualizationConfig);
        this.resetState();
        this.props.closeWizard();
    }

    updateVisualizationConfig = (visualizationConfig:any) => {
        this.setState( {visualizationConfig: Object.assign(this.state.visualizationConfig, visualizationConfig)});
    }

    render() {

        return (
            <Dialog
            usePortal={true}
            isOpen={this.props.isOpen}
            onClose={this.handleClose}
            canOutsideClickClose={true}
          >
          <div className={Classes.DIALOG_BODY}>
           <Navbar>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Tabs
                            animate={this.state.animate}
                            id="navbar"
                            large={true}
                            onChange={this.handleNavbarTabChange}
                            selectedTabId={this.state.navbarTabId}
                        >
                            <Tab id="visualization" title="Visualization" />
                            <Tab id="data" title="Data" />
                            <Tab id="configuration" title="Configuration" />
                        </Tabs>
                    </Navbar.Group>
        </Navbar>
          {this.renderPanel()}
          </div>
          <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <ButtonGroup>
                    <Button icon="delete" intent="danger" text="Cancel" onClick={this.handleClose}/>
                    <Button icon="plus" intent="success" text="Add" onClick={this.handleAddVisualization}/>
                </ButtonGroup>
              </div>
          </div>
          </Dialog>
            
        );
    }

}



export default VisualizationWizard;
 
