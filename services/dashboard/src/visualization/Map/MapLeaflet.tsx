import React, { ReactElement } from 'react';

import 'leaflet/dist/leaflet.css'

import { Map, GeoJSON, TileLayer, Popup, Marker, Polyline } from   'react-leaflet';
//import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'; //TODO
import { LatLngExpression, polyline } from 'leaflet';
import { node, region } from '../../Interfaces';
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
  width: number,
  height: number,
  lat: number,
  lng: number,
  zoom: number,
  polylines: LatLngExpression[][],
}

class MapLeaflet extends React.Component<Props,State> {

    state:State = {
      height: 800, // > 400 
      width: 0,
      lng: -71.09210968017578, //TODO
      lat:  42.34811019897461, //TODO
      zoom: 12,
      polylines: [],
    };


  componentWillReceiveProps(nextProps:Props) {
    this.setState({
                  
                  polylines: nextProps.data.polylines || [],
                  height: nextProps.height > 800? nextProps.height : 800,
                  width: nextProps.width,
                  })
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
    return (
       <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} style={{
         height: this.state.height,
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
        {
         region.polylines && region.polylines.length > 0 &&
         <Polyline color="lime" positions={this.state.polylines} options={ {noClip: true}}/>
        }
        
      </Map>
      
    );
  }
}


export default MapLeaflet;




        //<GeoJSON data={dataGeo} />