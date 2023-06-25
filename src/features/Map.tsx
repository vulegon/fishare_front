import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { apiKey } from '../config/google_map/api_key';
import { mapContainerStyle, mapOptions } from './defaultMapOption';
import { MarkerPosition } from '../types/types';
import SpotRegisterButton from './SpotRegisterButton';

function Map() {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({ lat: undefined, lng: undefined });
  const [spotRegisterButtonIsDisabled, setSpotRegisterButtonIsDisabled] = useState<boolean>(true);
  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng && e.latLng) {
      console.log(`緯度: ${e.latLng.lat()}, 経度: ${e.latLng.lng()}`);
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      setSpotRegisterButtonIsDisabled(false);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} onClick={onMapClick}>
        {markerPosition.lat && markerPosition.lng && (
          <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
        )}
        <div style={{ position: 'absolute', bottom: '20px', right: '70px' }}>
          <SpotRegisterButton isDisabled={spotRegisterButtonIsDisabled} />
        </div>
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
