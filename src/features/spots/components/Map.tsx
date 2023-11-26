import React, { useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { SpotData } from '../types/SpotData';
import { useLocation } from 'react-router-dom';
import { defaultPosition } from '../../../utils/constants/defalutPosition';

function Map({
  spotData,
  setSpotData,
}: {
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const latParam = searchParams.get('latitude');
  const lngParam = searchParams.get('longitude');
  const centerLat = latParam ? parseFloat(latParam) : defaultPosition.latitude;
  const centerLng = lngParam ? parseFloat(lngParam) : defaultPosition.longitude;

  useEffect(() => {
    setSpotData((prev) => ({ ...prev, position: { latitude: centerLat, longitude: centerLng } }));
    console.log(`緯度: ${spotData.position.latitude}, 経度: ${spotData.position.longitude}`);
  }, [location.search]);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng && latLng.lat() && latLng.lng()) {
      setSpotData((prev) => ({ ...prev, position: { latitude: latLng.lat(), longitude: latLng.lng() } }));
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
          lat: spotData.position.latitude ? spotData.position.latitude : defaultPosition.latitude,
          lng: spotData.position.longitude ? spotData.position.longitude : defaultPosition.longitude,
        },
        fullscreenControl: false,
      }}
      onClick={onMapClick}
    >
      <Marker position={{ lat: spotData.position.latitude, lng: spotData.position.longitude }} />
    </GoogleMap>
  );
}

export default Map;
