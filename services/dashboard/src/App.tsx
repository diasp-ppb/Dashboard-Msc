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
import  SideMenu from './components/SideMenu/SideMenu';


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
      />
    )
  }
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
};


const mapStateToProps = (store: IAppState) => {
  return store;
};


export default connect(mapStateToProps,mapDispatchToProps)(App);