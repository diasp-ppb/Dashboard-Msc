import { ActionCreator, Dispatch } from 'redux';
import { MosaicNode } from 'react-mosaic-component';
import { Theme, VisualizationConfig } from '../../Interfaces';


export enum AppActionTypes {
    ADD_LAYER = 'ADD_LAYER',
    REMOVE_LAYER = 'REMOVE_LAYER',
    OPEN_DRAWER = 'OPEN_DRAWER',
    CLOSE_DRAWER = 'CLOSE_DRAWER',
    SELECT_LAYER = 'SELECT_LAYER',
    UPDATE_WINDOWS_ARRANGEMENT = 'UPDATE_WINDOWS_ARRANGEMENT',
    CHANGE_THEME = 'CHANGE_THEME',
    ADD_VISUALIZATION = 'ADD_VISUALIZATION',
}

export interface IAppAddLayer{
    type: AppActionTypes.ADD_LAYER,
}
export interface IAppRemoveLayer{
    type: AppActionTypes.REMOVE_LAYER,
    nodeId: number,
}
export interface IAppOpenDrawer{
    type: AppActionTypes.OPEN_DRAWER,
}
export interface IAppCloseDrawer{
    type: AppActionTypes.CLOSE_DRAWER,
}
export interface IAppSelectLayer{
    type: AppActionTypes.SELECT_LAYER,
    layerId: number,
}

export interface IAppUpdateWindowArrangement{
    type: AppActionTypes.UPDATE_WINDOWS_ARRANGEMENT,
    currentNode: MosaicNode<number>,
}

export interface IAppChangeTheme{
    type: AppActionTypes.CHANGE_THEME,
    theme: Theme,
}

export interface IAppAddVisualization {
    type: AppActionTypes.ADD_VISUALIZATION,
    vis: VisualizationConfig,
}

export type AppAction = IAppAddLayer | IAppRemoveLayer | IAppOpenDrawer | 
                     IAppCloseDrawer | IAppSelectLayer | IAppUpdateWindowArrangement |
                     IAppChangeTheme | IAppAddVisualization;

export function addLayer() {
    return {
        type: AppActionTypes.ADD_LAYER
    }
}

export function openDrawer() {
    return {
        type: AppActionTypes.OPEN_DRAWER
    }
}

export function closeDrawer() {
    return {
        type: AppActionTypes.CLOSE_DRAWER
    }
}

export function selectLayer(layerId: number) {
    return {
        type: AppActionTypes.SELECT_LAYER,
        layerId: layerId,
    }
}

export function updateWindowArrangement(layerId: number, currentNode:MosaicNode<number>) {
    return {
        type: AppActionTypes.UPDATE_WINDOWS_ARRANGEMENT,
        layerId: layerId,
        currentNode: currentNode
    }
}

export function changeTheme(theme: Theme ) {
    return {
        type: AppActionTypes.CHANGE_THEME,
        theme:theme,
    }
}

export function addVisualization(vis: VisualizationConfig) {
    vis.data = dataExample;
    return {
        type: AppActionTypes.ADD_VISUALIZATION,
        vis: vis,
    }
}


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
  