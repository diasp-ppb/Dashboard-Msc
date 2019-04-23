import { region, defaultRegion } from "../Interfaces";


export function getRegion(regions: region[], options: string[]) {
    let selectedRegion = options[0];

    let region = regions.find( function(element) {
        return element.region === selectedRegion;
    }) || defaultRegion;
    
    return region;
}