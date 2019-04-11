import React  from 'react'
import { Dispatch } from 'redux'
import {
    Corner,
    createBalancedTreeFromLeaves,
    getLeaves,
    getNodeAtPath,
    getOtherDirection,
    getPathToCorner,
    MosaicDirection,
    MosaicNode,
    MosaicParent,
    updateTree,
  } from 'react-mosaic-component';
import { dropRight } from 'lodash';
import { LayerState, Theme, IAppState, THEMES } from '../../Interfaces';
import { openDrawer, changeTheme, updateWindowArrangement } from '../../redux/actions/AppActions';
import { connect } from 'react-redux';
import { Navbar, Button, ButtonGroup, NavbarGroup, NavbarDivider, NavbarHeading, HTMLSelect, Classes } from '@blueprintjs/core';
import classNames from 'classnames';

interface Props {
  theme: Theme,
  currentLayer: LayerState,
  layerId: number,
  openDrawer: Function,
  changeTheme: Function,
  updateWindowArrangement: Function,
}

class NavBar extends React.Component<Props> {

    addToTopRight = () => {
    
        let { currentNode, windowCount } = this.props.currentLayer;

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
        this.props.updateWindowArrangement(this.props.layerId,currentNode);

      };


      autoArrange = () => {
        const leaves = getLeaves(this.props.currentLayer.currentNode);
        let newNode = createBalancedTreeFromLeaves(leaves);
        this.props.updateWindowArrangement(this.props.layerId, newNode);
      };



      private renderNavBar() {
        return (
          <Navbar className={classNames(Classes.DARK)}>
            <NavbarGroup>
             <Button 
              icon="menu"
              onClick={ () => this.props.openDrawer()}
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
                    onChange={(e) => this.props.changeTheme(e.currentTarget.value as Theme)}
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
      
    render () {
        return this.renderNavBar();
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      openDrawer: () => dispatch(openDrawer()),
      updateWindowArrangement: (layerId:number, currentNode: MosaicNode<number>)  => dispatch(updateWindowArrangement(layerId,currentNode)),
      changeTheme: (theme: Theme) => dispatch(changeTheme(theme)),
    }
  };
  
  const mapStateToProps = (store: IAppState) => {
    const layerId = store.currentLayer;
    return {
      layerId: layerId,
      currentLayer: store.layers[layerId],
    };
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
  
  