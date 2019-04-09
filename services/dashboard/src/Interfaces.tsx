import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import {MosaicNode} from 'react-mosaic-component';
import { BarConfig } from './visualization/Chart/BarChart';
import { LineConfig } from './visualization/Chart/LineChart';
 
export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
};

export enum Visualization_Types {
    BAR_CHART = 'BAR_CHART',
    MAP_DECK_GL = 'MAP_DECK_GL',
    LINE_CHART = 'LINE_CHART',
    DATA_SOURCES = 'DATA_SOURCES',
}

export type Theme = keyof typeof THEMES;

export const EMPTY_ARRAY: any[] = [];

export interface  LayerState {
    currentNode: MosaicNode<number> | null;
    name: string;
}

export interface VisualizationConfig {
    type: Visualization_Types,
    dataId: string,
    nodeId: number,
    xAxis?: boolean,
    yAxis?: boolean,
    bars?: BarConfig[],
    lines?: LineConfig[],
    tooltip?: boolean,
    legend?:boolean,
    cartesianGrid: {
        active: boolean,
        strokeDasharray?: string,
    },
    baseMap?:boolean,
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
    },
    data: any,
}

export interface IAppState {
    layers: LayerState[],
    currentTheme: Theme;
    isOpen: boolean,
    currentLayer: number;
    visualizations: VisualizationConfig[][];
    data: DataConfig[];
}