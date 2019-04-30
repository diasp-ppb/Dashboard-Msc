import { region } from "../Interfaces";
import { LatLngExpression } from "leaflet";

export interface Filters {
    getNodesWithTag: Function,
    removeEdges: Function,
    [key: string]: Function,
}

function getNodesWithTag(region: region, options: string[]) {

    if (region.nodes && options.length > 0) {

        let selectedTag = options[0];

        if (selectedTag.length < 3) {
            return region;
        }

        let nodes = region.nodes.filter(node => {
            let result = false;
            node.tags.forEach((tag) => {
                if (tag.indexOf(selectedTag) >-1){
                    result = true;
                    return;
                }
            });
            return result;
        });
        let filteredRegion = { ...region, nodes: nodes };

        return filteredRegion;
    }
    return region;
}

function removeEdges(region: region, options: string[]) {
    if (region.polylines) {
        let polylines: LatLngExpression[][] = [];
        let filteredRegion = { ...region, polylines };
        console.log(filteredRegion);
        return filteredRegion;
    }
    return region;
}

export const filters: Filters = {
    getNodesWithTag: getNodesWithTag,
    removeEdges: removeEdges
}

