import React from 'react'
import dropRight from 'lodash/dropRight';
import classNames from 'classnames';
import { Classes, HTMLSelect } from '@blueprintjs/core';
import { openDrawer, updateWindowArrangement, changeTheme, addVisualization } from '../redux/actions/AppActions';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    Corner,
    createBalancedTreeFromLeaves,
    getLeaves,
    getNodeAtPath,
    getOtherDirection,
    getPathToCorner,
    Mosaic,
    MosaicDirection,
    MosaicNode,
    MosaicParent,
    MosaicWindow,
    MosaicZeroState,
    updateTree,
  } from 'react-mosaic-component';

import {
    THEMES,
    LayerState,
    EMPTY_ARRAY,
    Theme,
    VisualizationConfig,
    IAppState,
    } from '../Interfaces'


import {
    Button,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    ButtonGroup
  } from "@blueprintjs/core";

import Visualization from '../visualization/Visualization'
import ContainerDimensions from 'react-container-dimensions'
import VisualizationWizard from '../visualization/wizard/VisualizationWizard';


interface Props {
  theme: Theme,
  layerState: LayerState,
  visualizations: VisualizationConfig[],
  changeTheme: Function,
  addVisualization: Function,
  openDrawer: Function,
  updateWindowArrangement: Function,
  id: number,
}

let windowCount = 3;


interface State {
  visualizationWizzard:  boolean,
  nodeInFocus: number,
}

class Layer extends React.Component<Props, State> {
    
  state: State = {
    visualizationWizzard: false,
    nodeInFocus: -1,
  }


  private handleOpen = (id: number) => this.setState({ visualizationWizzard: true, nodeInFocus: id});


      _onChange = (currentNode: MosaicNode<number> | null) => {
        this.props.updateWindowArrangement(this.props.id, currentNode);
      };
    
      _onRelease = (currentNode: MosaicNode<number> | null) => {
        console.log('Mosaic.onRelease():', currentNode);
      };
    
      _createNode = () => ++windowCount;
    
    autoArrange = () => {
        const leaves = getLeaves(this.props.layerState.currentNode);
        let newNode = createBalancedTreeFromLeaves(leaves);
        this.props.updateWindowArrangement(this.props.id, newNode);
      };


    


     
    
    getVisualization(id:Number, width:number, height:number) {
      let vis = this.props.visualizations.find( item => item.nodeId === id)
      if (vis != undefined)
      {
        return (  
        <Visualization
          visualizationConfig={vis}
          height={width}
          width={height}
          />);
      }
      
      return (<Button icon="plus" onClick={() => this.handleOpen(id.valueOf())}/>);
    }

    addVisualization = (settings:VisualizationConfig) => {
        const vis: VisualizationConfig = {
          ...settings,
          nodeId: this.state.nodeInFocus,
        }
        this.props.addVisualization(vis);
    }

    render() {
        return (
            <div>
                {this.renderNavBar()}
                <Mosaic<number>
                renderTile={(count, path) => (
               
              <MosaicWindow<number>
                additionalControls={EMPTY_ARRAY}
                title={`Window ${count}`}
                createNode={this._createNode}
                path={path}
                onDragStart={() => console.log('MosaicWindow.onDragStart')}
                onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
                renderToolbar={count === 2 ? () => <div className="toolbar-example">Custom Toolbar</div> : null}
             >
                     <ContainerDimensions>
                     { ({ width, height }) => 
                       <div className="example-window">
                       {this.getVisualization(count, width *0.8 , height * 0.8 )}
                      </div>
                    }
                     </ContainerDimensions>
               
            </MosaicWindow> 
              )}
            zeroStateView={<MosaicZeroState createNode={this._createNode} />}
            value={this.props.layerState.currentNode}
            onChange={this._onChange}
            onRelease={this._onRelease}
            className={THEMES[this.props.theme]}
          />
            <VisualizationWizard
            isOpen={this.state.visualizationWizzard}
            closeWizard={() => this.setState({visualizationWizzard: false})}
            addVisualization={this.addVisualization}
            />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer()),
    updateWindowArrangement: (layerId:number, currentNode: MosaicNode<number>)  => dispatch(updateWindowArrangement(layerId,currentNode)),
    changeTheme: (theme: Theme) => dispatch(changeTheme(theme)),
    addVisualization: (vis: VisualizationConfig) => dispatch(addVisualization(vis))
  }
};

const mapStateToProps = (store: IAppState) => {
  const layerId = store.currentLayer;
  return {
    id: layerId,
    layerState: store.layers[layerId],
    visualizations: store.visualizations[layerId]
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(Layer);

