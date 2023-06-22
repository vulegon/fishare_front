import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { apiKey } from '../config/google_map/api_key'
import { mapContainerStyle, center, zoom } from './defaultMapOption'

function Map() {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
