import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { apiKey } from '../config/google_map/api_key'

function Map() {
  const height = window.innerHeight;
  document.getElementById('root')!.style.height = height + 'px';

  const containerStyle = {
    width: '100%',
    height: height,
  }

  const center = {
    lat: -3.745,
    lng: -38.523,
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
