import React from 'react';
import DataSelector from './selectors/DataSelector'
import ConfigurationSelector from './selectors/ConfigurationSelector'
import VisualizationSelector from './selectors/VisualizationSelector'
import {Dialog, Navbar, Tab, Tabs, Button, ButtonGroup ,Alignment} from "@blueprintjs/core";
import { Classes } from '@blueprintjs/core';
import { VisualizationsAvailable, VisualizationAvailable, VisualizationConfig } from "../../Interfaces"

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

class VisualizationWizard extends React.Component<VisualizationWizardProps, State> {

    state: State = {
        activePanelOnly: false,
        animate: true,
        vertical: false,
        navbarTabId: "visualization",
        visualizationConfig: {
            type: VisualizationsAvailable[0],
            data: {},
            nodeId: -1,
            xAxis: false,
            yAxis: false,
            cartesianGrid: {
                active: false,
                strokeDasharray: "3 3"
            }
        },
    }


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
                     <ConfigurationSelector updateConfig={this.updateDataConfig} config={this.state.visualizationConfig}/> 
                     : <DataSelector />;
    }

    selectVisualization = (item: VisualizationAvailable) => { 
        this.setState( (state) => 
            {
                let visualizationConfig = {...state.visualizationConfig, type: item}
                return {...state, visualizationConfig};
            })
    }

    handleClose = () => {this.props.closeWizard()}
    
    handleAddVisualization = () => {
        this.props.addVisualization(this.state.visualizationConfig);
        this.props.closeWizard();
    }

    updateDataConfig = (visualizationConfig:any) => {
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
 
