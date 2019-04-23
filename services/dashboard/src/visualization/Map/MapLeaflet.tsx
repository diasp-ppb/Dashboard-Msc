/// app.js
import React, { ReactElement } from 'react';

import { Map, GeoJSON, TileLayer, Popup, Marker, Polyline } from   'react-leaflet';


import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet/dist/leaflet.css'
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'; //TODO
import { tileLayer, LatLngExpression } from 'leaflet';
import { node, edge, region, defaultRegion } from '../../Interfaces';


//import data from '../../pombal';

//var dataGeo:FeatureCollection<Geometry,GeoJsonProperties> = data;

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
      lng: -8.597521914750235, //TODO
      lat: 39.889390483547047, //TODO
      zoom: 13,
    };

  
  addMarkers(region:region) {
    let markers = [];

    
    region.nodes &&
    region.nodes.forEach(function(element:node) {
      if(element.tags.length > 0)
      { 
        let position:LatLngExpression = [element.lat,element.lng];
        
        let tags:ReactElement[] = [];

          element.tags.forEach( function( element ) {
            tags.push(<p>{element}</p>);
          })

        markers.push(
          <Marker position={position}>
            <Popup>
               {tags}
            </Popup>
          </Marker>
        );
      }
    })
  }

  addEdges(region:region) {
    let polyline : LatLngExpression [] = [];

    region.edges &&
    region.edges.forEach(function (element:edge) {
      polyline.push(element.p1);
      polyline.push(element.p2);
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

    return (
       <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} style={{
         height: this.props.height
       }}  >
        {this.tileLayer()}
        {this.addMarkers(region)}
        {this.addEdges(region)}
      </Map>
     
    );
  }
}


export default MapLeaflet;




        //<GeoJSON data={dataGeo} />