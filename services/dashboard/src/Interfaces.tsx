import classNames from 'classnames';
import { Classes, IToastProps } from '@blueprintjs/core';
import {MosaicNode} from 'react-mosaic-component';
import { BarConfig } from './visualization/Chart/BarChart';
import { LineConfig } from './visualization/Chart/LineChart';
import { LatLngExpression } from 'leaflet';
import { List } from 'immutable';
 
export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
};

export enum Visualization_Types {
    BAR_CHART = 'BAR_CHART',
    MAP_DECK_GL = 'MAP_DECK_GL',
    MAP_LEAFLET = 'MAP_LEAFLET',
    LINE_CHART = 'LINE_CHART',
    DATA_SOURCES = 'DATA_SOURCES',
    FILTER_SELECTION = 'FILTER_SELECTION',
}

export type Theme = keyof typeof THEMES;

export const EMPTY_ARRAY: any[] = [];

export interface  LayerState {
    currentNode: MosaicNode<number> | null;
    name: string;
    windowCount: number;
}

export interface VisualizationConfig {
    type: Visualization_Types,
    dataId: string,
    nodeId: number,
    xAxis?: xAxis,
    yAxis?: boolean,
    bars?: BarConfig[],
    lines?: LineConfig[],
    tooltip?: boolean,
    legend?:boolean,
    cartesianGrid: {
        active: boolean,
        strokeDasharray?: string,
    },
    tileLayer?: boolean
    filters?: Filter[],
}

export interface Filter {
    filter: Function,
    options: string[]
}

export interface VisualizationProps {
    height: number,
    width: number,
    data: any,
    visualizationConfig: VisualizationConfig,
}

export interface DataConfig {
    dataId: string,
    apiEndpoint?: {
        route: string,
        compressedRoute?: string,
    },
    data: any,
}

export interface IAppState {
    toastQueue: List<IToastProps>,
    layers: LayerState[],
    currentTheme: Theme;
    isOpen: boolean,
    currentLayer: number;
    visualizations: VisualizationConfig[][];
    data: DataConfig[];
}


export interface xAxis{
    active: boolean,
    dataKey: string,
  }
  
export interface node  {
    x: number,
    y: number,
    lat: number,
    lng: number,
    tags: string[],
}  



export interface region {
    region: string,
    nodes?: node[],
    polylines?: LatLngExpression[][],
}


export const defaultRegion:region = {
    region: "default",
    nodes: [],
    polylines: [],
}

export const defaulxAxis:xAxis = {
    active: false,
    dataKey: "name"
  }
  
