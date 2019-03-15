import { applyMiddleware, createStore, Store } from 'redux';

import thunk from 'redux-thunk';


import {
    AppReducer
} from '../reducers/AppReducer'
import { IAppState } from '../../Interfaces';

const rootReducer = AppReducer;

export default function configureStore(): Store<IAppState, any> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
  }