import React from 'react'
import { openDrawer, updateWindowArrangement, changeTheme, addVisualization } from '../redux/actions/AppActions';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    Mosaic,
    MosaicNode,
    MosaicWindow,
    MosaicZeroState,
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
import NavBar from '../components/NavBar/NavBar';


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
        console.log('Mosaic.onRelease():', currentNode);
      };
    
      _createNode = () => ++windowCount;
     
    
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
                createNode={this._createNode}
                path={path}
                onDragStart={() => console.log('MosaicWindow.onDragStart')}
                onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
                renderToolbar={count === 2 ? () => <div className="toolbar-example">Custom Toolbar</div> : null}
             >
                     <ContainerDimensions>
                     { ({ width, height }) => 
                       <div className="example-window" style={{height: height, width: width}}>
                       {this.getVisualization(count, width * 0.95, height * 0.95)}
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
    visualizations: store.visualizations[layerId],
    data: store.data,
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(Layer);

