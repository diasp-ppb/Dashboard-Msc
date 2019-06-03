import {  Reducer } from 'redux';


import {
    AppAction,
    AppActionTypes,
    selectLayer,
} from '../actions/AppActions'
import { IAppState, VisualizationConfig } from '../../Interfaces';
import { initialAppState } from '../../settings/Settings';
import { List } from 'immutable';
import { IToastProps } from '@blueprintjs/core';
import { sendEvent } from '../../analytics/Analytics';



export const AppReducer: Reducer<IAppState, AppAction> = (
  state = initialAppState,
  action
) => {
  switch (action.type) {
    case AppActionTypes.ADD_LAYER: {
      sendEvent("ADD_LAYER");
      return {
        ...state,
        layers: Object.assign(state.layers, {currentNode: {}, splitPercentage: 40,})
      };
    }
    case AppActionTypes.OPEN_DRAWER: {
      sendEvent("OPEN_DRAWER");
      return {
        ...state,
        isOpen: true,
      }
    }
    case AppActionTypes.CLOSE_DRAWER: {
      sendEvent("CLOSE_DRAWER");
      return {
        ...state,
        isOpen: false,
      }
    }
    case AppActionTypes.SELECT_LAYER: {
      sendEvent("SELECT_LAYER_"+ action.layerId);
      return {
        ...state,
        currentLayer: action.layerId
      }
    }

    case AppActionTypes.UPDATE_WINDOWS_ARRANGEMENT: {
      sendEvent("UPDATED_WINDOW_ARRANGEMENT");
      const list = state.layers.map((item, j) => {
        if (j === state.currentLayer) {
          return {...item, currentNode: action.currentNode, windowCount: item.windowCount + 1}
        } else {
          return item;
          }
        });

        return {
          ...state, layers: list
        };
    }



    case AppActionTypes.CHANGE_THEME: {
      sendEvent("CHANGED_THEME");
      return {
        ...state,
        currentTheme: action.theme
      }
    }
    case AppActionTypes.ADD_VISUALIZATION: {
      sendEvent("ADD_VISUALIZATION_" + action.vis.type);

      const visu = state.visualizations.map((item, j) => {
         if(j=== state.currentLayer){
           return [...item, action.vis ] 
         } else {
           return item;
         }
      });
     return {...state, visualizations: visu}
    }
    case AppActionTypes.ADD_DATA_CONFIG: {
      sendEvent("ADD_DATA_CONFIG");
       let dataConfig =  action.dataConfig
       let data = [...state.data, dataConfig];
       return {...state, data: data};
    }
    case AppActionTypes.UPDATE_DATA: {
      sendEvent("UPDATE_DATA");
      const data = state.data.map((item, _j) =>  {
        if(item.dataId === action.dataId)
        {
          return {...item, data: action.data}
        } else {
          return item;
        }
      })
      return {...state, data:data}
    }

    case AppActionTypes.UPDATE_VISUALIZATION:{
      sendEvent("VISUALZIATION_UPDATED");
      let visualizationsInLayer:VisualizationConfig[] = state.visualizations[state.currentLayer].map( (item) => {
        if(item.nodeId === action.visualizationConfig.nodeId) {
          return action.visualizationConfig;
        }
        else {
          return item;
        }
      })

      let vis:VisualizationConfig[][] = state.visualizations;
      vis[state.currentLayer] = visualizationsInLayer;
      
      return {...state, visualizations: vis};
    }

    case AppActionTypes.ENQUEUE_TOAST: {
      console.log("TOASTS before ", state.toastQueue);
      
      let toasts = state.toastQueue.push(action.toast);

      console.log("TOASTS", toasts);
      
      return {
         ...state, toastQueue: toasts}
    }

    case AppActionTypes.CLEAR_TOASTS: {
      return {
        ...state, toastQueue: List<IToastProps>([])
      }
    }
    default:
      return state;
  }
};
