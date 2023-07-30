import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MarkerPosition } from '../../types/types';

function SpotCreateFormMap() {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({ lat: undefined, lng: undefined });

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng && e.latLng) {
      console.log(`緯度: ${e.latLng.lat()}, 経度: ${e.latLng.lng()}`);
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };
  return (
    <GoogleMap
      mapContainerStyle={{
        height: '500px',
        width: '700px',
      }}
      options={{
        zoom: 15,
        center: { lat: 36.063053704526226, lng: 136.22288055523217 },
        fullscreenControl: false,
      }}
      onClick={onMapClick}
    >
      {markerPosition.lat && markerPosition.lng && (
        <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
      )}
    </GoogleMap>
  );
}

export default SpotCreateFormMap;
