import { region } from "../Interfaces";

export interface Filters {
    getNodesWithTag: Function,
    removeEdges: Function,
    [key: string] : Function,
}

function getNodesWithTag(region: region, options: string[]) {
    let selectedTag = options[0];
    if  (region.nodes && region.edges)
    {
        let filteredRegion = {
            region: region.region,
            nodes: region.nodes.filter( node => node.tags.indexOf(selectedTag) > -1),
            edges: region.edges,
        }
        
      return filteredRegion;
    }
    return region;
}

function removeEdges(region: region, options: string[]) {
    if  (region.nodes && region.edges)
    {
        let filteredRegion = {
            region: region.region,
            nodes: region.nodes,
            edges: [],
        }
        
      return filteredRegion;
    }
    return region;
}

export const filters:Filters = {
    getNodesWithTag: getNodesWithTag,
    removeEdges: removeEdges
}

  