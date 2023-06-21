import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { apiKey } from '../config/google_map/api_key'

function map() {
  const containerStyle = {
    width: '400px',
    height: '400px',
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

export default map
