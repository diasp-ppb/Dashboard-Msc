import {  Reducer } from 'redux';


import {
    AppAction,
    AppActionTypes,
    selectLayer,
} from '../actions/AppActions'
import { IAppState, VisualizationConfig } from '../../Interfaces';
import { initialAppState } from '../../settings/Settings';



export const AppReducer: Reducer<IAppState, AppAction> = (
  state = initialAppState,
  action
) => {
  switch (action.type) {
    case AppActionTypes.ADD_LAYER: {
      return {
        ...state,
        layers: Object.assign(state.layers, {currentNode: {}, splitPercentage: 40,})
      };
    }
    case AppActionTypes.OPEN_DRAWER: {
      return {
        ...state,
        isOpen: true,
      }
    }
    case AppActionTypes.CLOSE_DRAWER: {
      return {
        ...state,
        isOpen: false,
      }
    }
    case AppActionTypes.SELECT_LAYER: {
      return {
        ...state,
        currentLayer: action.layerId
      }
    }

    case AppActionTypes.UPDATE_WINDOWS_ARRANGEMENT: {
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
      return {
        ...state,
        currentTheme: action.theme
      }
    }
    case AppActionTypes.ADD_VISUALIZATION: {
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
       let dataConfig =  action.dataConfig
       let data = [...state.data, dataConfig];
       return {...state, data: data};
    }
    case AppActionTypes.UPDATE_DATA: {
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
      let visualizationsInLayer:VisualizationConfig[] = state.visualizations[state.currentLayer].map( (item) => {
        if(item.nodeId === action.visualizatioConfig.nodeId) {
          return action.visualizatioConfig;
        }
        else {
          return item;
        }
      })

      let vis:VisualizationConfig[][] = state.visualizations;
      vis[state.currentLayer] = visualizationsInLayer;
      return {...state, visualizations: vis};
    }
    default:
      return state;
  }
};
