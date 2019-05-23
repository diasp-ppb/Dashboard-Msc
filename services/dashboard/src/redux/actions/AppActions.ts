import { ActionCreator, Dispatch } from 'redux';
import { MosaicNode } from 'react-mosaic-component';
import { Theme, VisualizationConfig, DataConfig } from '../../Interfaces';
import { IToastProps } from '@blueprintjs/core';


export enum AppActionTypes {
    ADD_LAYER = 'ADD_LAYER',
    REMOVE_LAYER = 'REMOVE_LAYER',
    OPEN_DRAWER = 'OPEN_DRAWER',
    CLOSE_DRAWER = 'CLOSE_DRAWER',
    SELECT_LAYER = 'SELECT_LAYER',
    UPDATE_WINDOWS_ARRANGEMENT = 'UPDATE_WINDOWS_ARRANGEMENT',
    CHANGE_THEME = 'CHANGE_THEME',
    ADD_VISUALIZATION = 'ADD_VISUALIZATION',
    ADD_DATA_CONFIG = 'ADD_DATA_CONFIG',
    UPDATE_DATA = 'UPDATE_DATA',
    UPDATE_VISUALIZATION = 'UPDATE_VISUALIZATION',
    CLEAR_TOASTS = 'CLEAR_TOASTS',
    ENQUEUE_TOAST = 'ENQUEUE_TOAST',
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

export interface IAppAddDataConfig {
    type: AppActionTypes.ADD_DATA_CONFIG,
    dataConfig: DataConfig,
}

export interface IAppDataUpdate {
    type: AppActionTypes.UPDATE_DATA
    dataId: string,
    data: any,
}

export interface IAppVisualizationUpdate {
    type: AppActionTypes.UPDATE_VISUALIZATION
    visualizationConfig: VisualizationConfig
}

export interface IAppEnqueueToast {
    type: AppActionTypes.ENQUEUE_TOAST,
    toast: IToastProps,
}

export interface IAppClearToasts {
    type: AppActionTypes.CLEAR_TOASTS,
}

export type AppAction = IAppAddLayer | IAppRemoveLayer | IAppOpenDrawer | 
                     IAppCloseDrawer | IAppSelectLayer | IAppUpdateWindowArrangement |
                     IAppChangeTheme | IAppAddVisualization | IAppAddDataConfig | IAppDataUpdate |
                     IAppVisualizationUpdate | IAppEnqueueToast | IAppClearToasts;

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
    return {
        type: AppActionTypes.ADD_VISUALIZATION,
        vis: vis,
    }
}

export function addDataConfig(dataConfig: DataConfig){
    return {
        type: AppActionTypes.ADD_DATA_CONFIG,
        dataConfig: dataConfig
    }
}

export function updateData(dataId:string, data:any) {
    return {
        type: AppActionTypes.UPDATE_DATA,
        dataId:dataId,
        data: data,
    }
}

export function updateVisualizationConfig(visualizationConfig: VisualizationConfig) {
    return {
        type: AppActionTypes.UPDATE_VISUALIZATION,
        visualizationConfig: visualizationConfig,
    }
}

export function addToast(toast:IToastProps) {
    return {
        type: AppActionTypes.ENQUEUE_TOAST,
        toast,
    }
}


export function cleartToasts() {
    return {
        type: AppActionTypes.CLEAR_TOASTS,
    }
}