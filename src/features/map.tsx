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
    lat: 36.063053704526226,
    lng: 136.22288055523217,
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
