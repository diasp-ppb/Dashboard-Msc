import { ActionCreator, Dispatch } from 'redux';
import { MosaicNode } from 'react-mosaic-component';
import { Theme } from '../../Interfaces';


export enum AppActionTypes {
    ADD_LAYER = 'ADD_LAYER',
    REMOVE_LAYER = 'REMOVE_LAYER',
    OPEN_DRAWER = 'OPEN_DRAWER',
    CLOSE_DRAWER = 'CLOSE_DRAWER',
    SELECT_LAYER = 'SELECT_LAYER',
    UPDATE_WINDOWS_ARRANGEMENT = 'UPDATE_WINDOWS_ARRANGEMENT',
    CHANGE_THEME = 'CHANGE_THEME',
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

export type AppAction = IAppAddLayer | IAppRemoveLayer | IAppOpenDrawer | 
                     IAppCloseDrawer | IAppSelectLayer | IAppUpdateWindowArrangement |
                     IAppChangeTheme;

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