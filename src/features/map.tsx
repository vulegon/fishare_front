import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { APIKey } from '../config/api_key'

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
    <LoadScript googleMapsApiKey={APIKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default map
