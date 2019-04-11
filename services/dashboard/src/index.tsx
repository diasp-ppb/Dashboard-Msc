import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { Provider } from 'react-redux';
import { Store } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'

import { IAppState } from './Interfaces';
import configureStore from './redux/store/Store';

interface IProps {
    store: Store<IAppState>;
}


const {store,persistor} = configureStore();


const Root: React.SFC<IProps> = props => {
    return (
      <Provider store={props.store}>
        <PersistGate loading={null} persistor={persistor}> 
        <App />
        </PersistGate>
      </Provider>
    );
  };


ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
