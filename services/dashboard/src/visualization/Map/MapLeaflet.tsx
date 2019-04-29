/// app.js
import React, { ReactElement, ReactChildren } from 'react';

import { Map, GeoJSON, TileLayer, Popup, Marker, Polyline } from   'react-leaflet';
import { IconNames } from "@blueprintjs/icons";
import { Icon, Intent } from "@blueprintjs/core";
import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet/dist/leaflet.css'
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'; //TODO
import { tileLayer, LatLngExpression } from 'leaflet';
import { node, edge, region, defaultRegion } from '../../Interfaces';
import marker from './map-marker.png'

//import data from '../../pombal';

//var dataGeo:FeatureCollection<Geometry,GeoJsonProperties> = data;

import L from 'leaflet'

var myIcon = L.icon({
  iconUrl: marker,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0],
  shadowUrl: marker,
  shadowSize: [32, 32],
  shadowAnchor: [16, 16]
})



interface Props {
  width: number,
  height: number,
  tileLayer: boolean,
  data: region, //TODO GEOJSON
}
interface State {
  lat: number,
  lng: number,
  zoom: number,
}

class MapLeaflet extends React.Component<Props,State> {

    state:State = {
      lng: -8.5601989, //TODO
      lat: 40.5857447, //TODO
      zoom: 13,
    };

  addEdges = (region:region) => {
    let polyline : LatLngExpression [] = [];
    let i = 0;
    region.edges &&
    region.edges.forEach(function (element:edge) {
      if(i === 0)
      console.log("elemente" , element);

      i++;
      polyline.push([element[0].lat, element[0].lng]);
    });

    return  (<Polyline color="lime" positions={polyline} />)
  }

  tileLayer() {
    if(this.props.tileLayer)
      return ( <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />)
    
    return null;
  }
  
  
  
  render() {
    const region = this.props.data;
    console.log("Leaflet", region );
    return (
       <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} style={{
         height: this.props.height
       }}  >
      
        {this.tileLayer()}
        {region.nodes &&
          region.nodes.map(function(element:node, index) {
            if(element.tags.length > 0)
             { 
              let position:LatLngExpression = [element.lat,element.lng];
          
              let tags:ReactElement[] = [];
  
             element.tags.forEach( function( element, index) {
                tags.push(<p key={index}>{element}</p>);
              })
  
             return (
             <Marker key={index} position={position} icon={myIcon}>
                <Popup>
                   {tags}
                </Popup>
              </Marker>
            );
          }
        })}
        {this.addEdges(region)}
      </Map>
     
    );
  }
}


export default MapLeaflet;




        //<GeoJSON data={dataGeo} />