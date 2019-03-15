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
import  SideMenu from './components/SideMenu/SideMenu';

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

  render() {
    return (
      <div className="react-mosaic-example-app" >
        <SideMenu/>
        {this.getCurrentLayer()}  
        </div>
    );
  }

  private getCurrentLayer() {
    const {currentTheme} = this.props;
    return (
      <Layer 
       theme={currentTheme}
       addVisualization={this.addVisualization}
      />
    )
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
  return {}
};


const mapStateToProps = (store: IAppState) => {
  return store;
};


export default connect(mapStateToProps,mapDispatchToProps)(App);