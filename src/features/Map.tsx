import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { apiKey } from '../config/google_map/api_key';
import { mapContainerStyle, mapOptions } from './defaultMapOption';

function Map() {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions}></GoogleMap>
    </LoadScript>
  );
}

export default Map;
