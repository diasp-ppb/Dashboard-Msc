import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import  HeatmapLayer  from 'react-leaflet-heatmap-layer';
import dataTest from './dataTest.json';


export default class Heatmap extends React.Component {


  componentDidCatch(error, errorInfo){
    
  }

  render() {
    return (
        <div >
        <Map center={[0,0]} zoom={13} style={{
         height: this.props.height,
        }}>
          {dataTest && dataTest.length > 0 &&
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={dataTest}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])} />
          }
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
        </div>
    );
  }

}