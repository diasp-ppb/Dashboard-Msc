import {  Reducer } from 'redux';


import {
    AppAction,
    AppActionTypes,
} from '../actions/AppActions'
import { IAppState,  } from '../../Interfaces';


const initialAppState : IAppState = {
    layers: [
      {
        currentNode: {
          direction: 'row',
          first: 2,
          second: {
            direction: 'column',
            first: 1,
            second: 3,
          },
          splitPercentage: 40,
        },
      },
      {
        currentNode: {
          direction: 'row',
          first: 1,
          second: {
            direction: 'column',
            first: 2,
            second: 3,
          },
          splitPercentage: 40,
        }
    }
    ],
    currentTheme: 'Blueprint',
    isOpen: false,
    currentLayer: 0,
    visualizations: [
      [],
      []
    ]
}

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
    default:
      return state;
  }
};
