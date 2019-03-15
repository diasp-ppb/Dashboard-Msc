import React from 'react'
import dropRight from 'lodash/dropRight';
import classNames from 'classnames';
import { Classes, HTMLSelect } from '@blueprintjs/core';

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
    VisualizationConfig
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
  updateTree: Function,
  drawerToggle: Function,
  visualizations: VisualizationConfig[],
  setTheme: Function,
  addVisualization: Function,
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
        this.props.updateTree(currentNode);
      };
    
      _onRelease = (currentNode: MosaicNode<number> | null) => {
        console.log('Mosaic.onRelease():', currentNode);
      };
    
      _createNode = () => ++windowCount;
    
    autoArrange = () => {
        const leaves = getLeaves(this.props.layerState.currentNode);
        let newNode = createBalancedTreeFromLeaves(leaves);
        this.props.updateTree(newNode);
      };


    addToTopRight = () => {
    
        let { currentNode } = this.props.layerState;
    
        if (currentNode) {
          const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
          const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<number>;
          const destination = getNodeAtPath(currentNode, path) as MosaicNode<number>;
          const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';
    
          let first: MosaicNode<number>;
          let second: MosaicNode<number>;
          if (direction === 'row') {
            first = destination;
            second = ++windowCount;
          } else {
            first = ++windowCount;
            second = destination;
          }
    
          currentNode = updateTree(currentNode, [
            {
              path,
              spec: {
                $set: {
                  direction,
                  first,
                  second,
                },
              },
            },
          ]);
        } else {
          currentNode = ++windowCount;
        }
        this.props.updateTree(currentNode);

      };

      private handleDrawer = () => this.props.drawerToggle();

      private renderNavBar() {
        return (
          <Navbar className={classNames(Classes.DARK)}>
            <NavbarGroup>
             <Button 
              icon="menu"
              onClick={this.handleDrawer}
             />
            
             <NavbarDivider />

            
              <NavbarHeading>
                  <a href="localhost:3001">
                    Urban Dash
                  </a>
                </NavbarHeading>
              </NavbarGroup>
    
            <NavbarGroup>
              <ButtonGroup>
                <HTMLSelect
                    value={this.props.theme}
                    onChange={(e) => this.props.setTheme(e.currentTarget.value as Theme)}
                >
                  {React.Children.toArray(Object.keys(THEMES).map((label) => <option>{label}</option>))}
                </HTMLSelect>
               
              
                <NavbarDivider />
    
                <Button 
                  onClick={this.autoArrange}
                  icon="grid-view" 
                >
                  Auto Arrange
                </Button>
    
                <Button
                  onClick={this.addToTopRight}
                  icon="arrow-top-right"
                >
                  Add Window
                </Button>
              </ButtonGroup>
            </NavbarGroup>
    
          </Navbar>
         
        );
      }
    
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

export default Layer;