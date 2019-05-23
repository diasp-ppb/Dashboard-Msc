import React, { createRef } from 'react';

import { IAppState, Theme } from './Interfaces';

import { Dispatch } from 'redux';

import { connect } from 'react-redux';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "../node_modules/react-mosaic-component/react-mosaic-component.css";
import './App.css';
import Layer from './layer/Layer'
import  SideMenu from './components/sidemenu/SideMenu';
import { Toaster, IToastProps } from '@blueprintjs/core';
import { cleartToasts } from './redux/actions/AppActions';
import { List } from 'immutable';

interface IAppProps {
  clearToasts: Function,
  currentTheme: string,
  toastQueue: List<IToastProps>,
}

class App extends React.PureComponent<IAppProps,IAppState> {

  private toaster = createRef<Toaster>();


  componentDidUpdate(prevProps:IAppProps, prevState:IAppState) {
    console.log("component UPdate");
    if (this.props.toastQueue.size) {
      this.props.toastQueue.forEach((toast:IToastProps) => {

        console.log("toaster", this.toaster, this.toaster.current);

         this.toaster && this.toaster.current &&
         this.toaster.current.show(toast);
      });
      this.props.clearToasts();
    }
  }

  render() {
    console.log("toast queue" , this.props.toastQueue);
    return (
      <div className="react-mosaic-example-app" >        
        <Toaster position={"top-right"} ref={ this.toaster } />
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
  return {
    clearToasts: () => dispatch(cleartToasts()),
  }
};


const mapStateToProps = (store: IAppState) => {
  return {
    currentTheme: store.currentTheme,
    toastQueue: store.toastQueue,
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(App);