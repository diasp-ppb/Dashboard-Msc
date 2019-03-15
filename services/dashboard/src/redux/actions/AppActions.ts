import { ActionCreator, Dispatch } from 'redux';


export enum AppActionTypes {
    ADD_LAYER = 'ADD_LAYER',
    REMOVE_LAYER = 'REMOVE_LAYER',
    OPEN_DRAWER = 'OPEN_DRAWER',
    CLOSE_DRAWER = 'CLOSE_DRAWER',
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


export type AppAction = IAppAddLayer | IAppRemoveLayer | IAppOpenDrawer | IAppCloseDrawer;

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

       