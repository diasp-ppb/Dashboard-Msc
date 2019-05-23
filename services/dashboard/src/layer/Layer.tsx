import React from 'react'
import { openDrawer, updateWindowArrangement, changeTheme, addVisualization } from '../redux/actions/AppActions';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    Mosaic,
    MosaicNode,
    MosaicWindow,
  } from 'react-mosaic-component';

import {
    THEMES,
    LayerState,
    EMPTY_ARRAY,
    Theme,
    VisualizationConfig,
    IAppState,
    DataConfig,
    } from '../Interfaces'


import {
    Button
  } from "@blueprintjs/core";

import Visualization from '../visualization/Visualization'
import ContainerDimensions from 'react-container-dimensions'
import VisualizationWizard from '../visualization/wizard/VisualizationWizard';
import NavBar from '../components/navbar/NavBar';


interface Props {
  theme: Theme,
  layerState: LayerState,
  visualizations: VisualizationConfig[],
  changeTheme: Function,
  addVisualization: Function,
  openDrawer: Function,
  updateWindowArrangement: Function,
  id: number,
  data: DataConfig[],
}

interface State {
  visualizationWizzard:  boolean,
  nodeInFocus: number,
}

let windowCount  = 1; //check createNode


class Layer extends React.Component<Props, State> {
    
  state: State = {
    visualizationWizzard: false,
    nodeInFocus: -1,
  }

  getData = (dataId: string) =>  {
     return this.props.data.find(function(item:DataConfig) {
      return item.dataId === dataId;
     })
  }

   handleOpen = (id: number) => this.setState({ visualizationWizzard: true, nodeInFocus: id});


      _onChange = (currentNode: MosaicNode<number> | null) => {
        this.props.updateWindowArrangement(this.props.id, currentNode);
      };
    
      _onRelease = (currentNode: MosaicNode<number> | null) => {
      };

    getVisualization(id:Number, width:number, height:number) {
      let vis = this.props.visualizations.find( item => item.nodeId === id)
      if (vis != undefined)
      { 
        let data = this.getData(vis.dataId);
        return (  
        <Visualization
          visualizationConfig={vis}
          data={data}
          height={height}
          width={width}
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
                <NavBar
                  theme={this.props.theme}
                />
                <Mosaic<number>
                renderTile={(count, path) => (
               
              <MosaicWindow<number>
                additionalControls={EMPTY_ARRAY}
                title={`Window ${count}`}
                path={path}
                onDragStart={() => {}}
                onDragEnd={(type) => {}}
                renderToolbar={count === 6 ? () => <div className="toolbar-example">Custom Toolbar</div> : null}
             >
                     <ContainerDimensions>
                     { ({ width, height }) => 
                       <div style={{height: height, width: width}}>
                       {this.getVisualization(count, width * 0.95, height * 0.95)}
                       </div>
                    }
                     </ContainerDimensions>
               
            </MosaicWindow> 
              )}
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
    visualizations: store.visualizations[layerId],
    data: store.data,
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(Layer);

