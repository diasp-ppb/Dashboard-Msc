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
    VisualizationConfig,
} from '../Interfaces'


import {
    Button,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    ButtonGroup,
  } from "@blueprintjs/core";

import Visualization from '../visualization/Visualization'

interface Props {
  theme: Theme,
  layerState: LayerState,
  updateTree: Function,
  drawerToggle: Function,
  visualizations: VisualizationConfig[],
}

let windowCount = 3;

class Layer extends React.Component<Props> {
    

    state: LayerState = this.props.layerState

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
                    onChange={(e) => this.setState({ currentTheme: e.currentTarget.value as Theme })}
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
    
    getVisualization(id:Number) {
      let vis = this.props.visualizations.find( item => item.nodeId === id)

      if (vis != undefined)
      {
        return (  
        <Visualization
          type={vis.type}
          data={vis.data} 
          height={300}
          width={300}
          />);
      }
      else 

      return;
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
                <div className="example-window">
                  <h1>{`Window ${count}`}</h1>
                  {this.getVisualization(count)}
                </div>
  
              </MosaicWindow>
            )}
            zeroStateView={<MosaicZeroState createNode={this._createNode} />}
            value={this.props.layerState.currentNode}
            onChange={this._onChange}
            onRelease={this._onRelease}
            className={THEMES[this.props.theme]}
          />
            </div>
        )
    }
}

export default Layer;