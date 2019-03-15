import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import React from 'react'
import {MosaicNode} from 'react-mosaic-component';
import { BarConfig } from './visualization/Chart/BarChart';
import { LineConfig } from './visualization/Chart/LineChart';
 
export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
  ['None']: '',
};


export interface VisualizationAvailable {
    type: string,
};


export const VisualizationsAvailable = [
    { type: 'BAR_CHART' },
    { type: 'MAP_DECK_GL'},
    { type: 'LINE_CHART'},
]

export const filterVisualization: ItemPredicate<VisualizationAvailable> = (query, visualization) => {
    return `${visualization.type}`.indexOf(query.toLowerCase()) >= 0;
};

export const renderVisualization: ItemRenderer<VisualizationAvailable> = (visualization, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    const text = `${visualization.type}. `;
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={visualization.type}
            key={visualization.type}
            onClick={handleClick}
            text={text}
        />
    );
};


export type Theme = keyof typeof THEMES;


export const EMPTY_ARRAY: any[] = [];

export interface  LayerState {
    currentNode: MosaicNode<number> | null;
}

export interface VisualizationConfig {
    type: VisualizationAvailable,
    data: any,
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
    visualizationConfig: VisualizationConfig,
}

export interface IAppState {
    layers: LayerState[],
    currentTheme: Theme;
    isOpen: boolean,
    currentLayer: number;
    visualizations: VisualizationConfig[][],
}