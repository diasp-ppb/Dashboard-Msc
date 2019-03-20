/// app.js
import React from 'react';

import { Map, GeoJSON, TileLayer, Popup, Marker } from   'react-leaflet';


import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet/dist/leaflet.css'
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';


import data from '../../pombal';

var dataGeo:FeatureCollection<Geometry,GeoJsonProperties> = data;


// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoicm9kYXZvY2UiLCJhIjoiY2p0NGJra25sMTJ5bzN6cHF2eWYwb3phbyJ9.G6KmfjzggRhuQvBVvqSaXA';

interface Props {
  width: number,
  height: number,
}
interface State {
  lat: number,
  lng: number,
  zoom: number,
}

class MapLeaflet extends React.Component<Props,State> {

    state = {
      lng: -8.597521914750235, 
      lat: 39.889390483547047,
      zoom: 13,
      open: false
    };

	
  render() {
    return (
       <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} style={{
         height: this.props.height
       }}  >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />


        <GeoJSON data={dataGeo} />
      </Map>
     
    );
  }
}


export default MapLeaflet;
