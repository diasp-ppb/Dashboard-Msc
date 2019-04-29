import React, { ReactElement } from 'react';

import 'leaflet/dist/leaflet.css'

import { Map, GeoJSON, TileLayer, Popup, Marker, Polyline } from   'react-leaflet';
//import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'; //TODO
import { LatLngExpression, polyline } from 'leaflet';
import { node, edge, region } from '../../Interfaces';
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
      lng: -8.5601989, //TODO
      lat: 40.5857447, //TODO
      zoom: 12,
      polylines: [],
    };


  componentWillReceiveProps(nextProps:Props) {
    console.log("receive NEw props");
    this.setState({
                  
                  polylines: this.addEdges(nextProps.data),
                  height: nextProps.height > 800? nextProps.height : 800,
                  width: nextProps.width,
                  })
  }

  addEdges = (region:region) => {
    
    let polyline : LatLngExpression [][] = [];
    
    console.log("total edges", region.edges && region.edges.length);
    
    region.edges &&
    region.edges.forEach(function (element:edge) {
      polyline.push([[element[0].lat, element[0].lng],[element[1].lat,element[1].lng]]);
    })

    return polyline;
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

        <Polyline color="lime" positions={this.state.polylines} options={ {noClip: true}}/>
        
      </Map>
      
    );
  }
}


export default MapLeaflet;




        //<GeoJSON data={dataGeo} />