import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import {
    MosaicNode,
  } from 'react-mosaic-component';


export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
  ['None']: '',
};

export type Theme = keyof typeof THEMES;


export const EMPTY_ARRAY: any[] = [];

export interface  LayerState {
    currentNode: MosaicNode<number> | null;
}

export interface VisualizationConfig {
    type: string, //TODO REFAZER PARA TIPOS 
    data: any,
    nodeId: number,
}

export interface VisualizationProps {
    type: string, //TODO REFAZER PARA TIPOS 
    data: any,
    height: number,
    width: number,
}

export interface AppState {
    layers: LayerState[],
    isOpen: boolean,
    currentTheme: Theme;
    currentLayer: number;
    visualizations: VisualizationConfig[][],
}