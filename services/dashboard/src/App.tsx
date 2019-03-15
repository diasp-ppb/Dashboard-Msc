import { Classes, Divider, H4 } from '@blueprintjs/core';
import React from 'react';

import {
  Button,
  Drawer,
  ButtonGroup,
} from "@blueprintjs/core";

import {
  IAppState,
  Theme,
  VisualizationConfig,
  THEMES,
} from './Interfaces';

import { Dispatch } from 'redux';

import { connect } from 'react-redux';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "../node_modules/react-mosaic-component/react-mosaic-component.css";
import './App.css';
import Layer from './layer/Layer'

import { closeDrawer } from './redux/actions/AppActions';

const dataExample = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const dataExample2 = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
];



class App extends React.PureComponent<IAppState> {



  renderMenuLayers() {
  
    return Object.keys(this.props.layers).map( (_item, index) => {
      return (
      <Button intent="primary" onClick={() => this.selectLayer(index)} icon="presentation" key={index}>
        {index}
      </Button>);

    })
  }

  render() {
    const {currentTheme, isOpen} = this.props;
    return (
      <div className="react-mosaic-example-app" >
        <Drawer
                    className={THEMES[currentTheme]}
                    icon="info-sign"
                    onClose={()=>this.props.closeDrawer()}
                    title="Urban Menu"
                    autoFocus={true}
                    canEscapeKeyClose={true}
                    canOutsideClickClose={true}
                    enforceFocus={true}
                    hasBackdrop={true}
                    isOpen={isOpen}
                    size={Drawer.SIZE_SMALL}
                    usePortal={false}
                    vertical={false}
                    style={{left: 0}}
        >
        <div className={Classes.DRAWER_BODY}>
            <div className={Classes.DIALOG_BODY}>
            <ButtonGroup vertical={true} fill={true}>
              <H4>Layers</H4>
              {this.renderMenuLayers()}
            </ButtonGroup>
            <Divider/>
            </div>
        </div>

          <div className={Classes.DRAWER_FOOTER}>Urban Dash Footer</div>
        </Drawer>
        {this.getCurrentLayer()}  
        </div>
    );
  }

  handleDrawer = () => {
    //let newStatus = !this.state.isOpen;
    //this.setState( (state) => {return {...state, isOpen: newStatus}})
  }

  private getCurrentLayer() {
    const {currentTheme, layers, currentLayer, visualizations} = this.props;
    return (
      <Layer theme={currentTheme} 
       layerState={layers[currentLayer]}  
       updateTree={this.updateTree}
       visualizations={visualizations[currentLayer]}
       setTheme={this.setTheme}
       addVisualization={this.addVisualization}
      />
    )
  }


  updateTree = (currentNode: any) => {
   /* this.setState( (state) => {
      const list = this.state.layers.map((item, j) => {
        if (j === this.state.currentLayer) {
          return {...item, currentNode: currentNode}
        } else {
          return item;
          }
        });

        return {
          ...state, layers: list
        };
      });*/
    };

  setTheme = (theme: Theme) => {
   /*  this.setState( (state) => {
        return {
          ... state,
          currentTheme: theme,
        }
     });*/
  }

  addVisualization = (vis: VisualizationConfig) => {
      /*vis.data = dataExample;
      this.setState( (state) => {
        const visu = this.state.visualizations.map((item, j) => {
         if(j=== this.state.currentLayer){
           return [...item, vis ] 
         } else {
           return item;
         }
        })

        return {
          ...state, visualizations: visu
        }
      })*/
  }


  private selectLayer = ( index: number) => {
   /* this.setState( (state) =>{ 
                  return {
                    ...state, 
                    currentLayer: index,
                    isOpen: false,
                  } 
                })*/
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  }
};


const mapStateToProps = (store: IAppState) => {
  return store;
};


export default connect(mapStateToProps,mapDispatchToProps)(App);