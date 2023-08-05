import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MarkerPosition } from '../../types/types';
import { useLocation } from 'react-router-dom';

function SpotCreateFormMap() {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({ lat: undefined, lng: undefined });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const centerLat = latParam ? parseFloat(latParam) : 36.063053704526226;
  const centerLng = lngParam ? parseFloat(lngParam) : 136.22288055523217;

  useEffect(() => {
    setMarkerPosition({ lat: centerLat, lng: centerLng});
   },[])

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
        center: { lat: centerLat, lng: centerLng },
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
