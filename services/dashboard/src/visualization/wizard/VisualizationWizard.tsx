import React from 'react';
import DataSelector from './selectors/DataSelector'
import ConfigurationSelector from './selectors/ConfigurationSelector'
import VisualizationSelector from './selectors/VisualizationSelector'
import {Dialog, Navbar, Tab, Tabs, Button, ButtonGroup ,Alignment} from "@blueprintjs/core";
import { Classes } from '@blueprintjs/core';
import { VisualizationsAvailable, VisualizationAvailable, } from "../../Interfaces"

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
    VisualizationSelected: VisualizationAvailable,
    navBarTabId: string
}

class VisualizationWizard extends React.Component<VisualizationWizardProps> {

    state = {
        activePanelOnly: false,
        animate: true,
        vertical: false,
        visualizationSelected: VisualizationsAvailable[0],
        navbarTabId: "visualization"
    }


    handleNavbarTabChange = (navbarTabId: string) => this.setState({ navbarTabId });

    renderPanel() {
        let panel = this.state.navbarTabId;
        return panel === "visualization" ?
                     <VisualizationSelector 
                        visualizationSelected={this.state.visualizationSelected}
                        selectVisualization={this.selectVisualization}
                     /> 
                     :  
                     panel === "configuration" ?  <ConfigurationSelector /> : <DataSelector />;

    }

    selectVisualization = (item: VisualizationAvailable) => { this.setState({visualizationSelected: item})}

    handleClose = () => {this.props.closeWizard()}
    
    handleAddVisualization = () => {
        let settings = {
            visualizationSelected: this.state.visualizationSelected,
        }
        this.props.addVisualization(settings);
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
                            <Tab id="configuration" title="Configuration" />
                            <Tab id="data" title="Data" />
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
 
