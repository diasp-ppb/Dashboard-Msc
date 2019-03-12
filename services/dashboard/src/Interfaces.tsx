import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import React from 'react'
import {MosaicNode} from 'react-mosaic-component';


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