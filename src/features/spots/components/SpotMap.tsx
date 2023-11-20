import React, { useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MarkerPosition } from '../../../types/Spot';
import { useLocation } from 'react-router-dom';
import { defaultPosition } from '../../../utils/constants/defalutPosition';

function SpotCreateFormMap({
  markerPosition,
  setMarkerPosition,
}: {
  markerPosition: MarkerPosition;
  setMarkerPosition: React.Dispatch<React.SetStateAction<MarkerPosition>>;
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const centerLat = latParam ? parseFloat(latParam) : defaultPosition.lat;
  const centerLng = lngParam ? parseFloat(lngParam) : defaultPosition.lng;

  useEffect(() => {
    setMarkerPosition({ lat: centerLat, lng: centerLng });
  }, []);

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
        center: {
          lat: markerPosition.lat ? markerPosition.lat : defaultPosition.lat,
          lng: markerPosition.lng ? markerPosition.lng : defaultPosition.lng,
        },
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
