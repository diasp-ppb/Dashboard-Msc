import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const midleware = [thunk];

const persistConfig = {
    key:'root',
    storage
}

import {
    AppReducer
} from '../reducers/AppReducer'

const rootReducer = AppReducer;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = applyMiddleware(...midleware)

export default function configureStore() {
    const store = createStore(persistedReducer, undefined, composedEnhancers);
    return {store, persistor: persistStore(store) };
  }