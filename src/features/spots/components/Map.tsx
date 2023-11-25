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
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const centerLat = latParam ? parseFloat(latParam) : defaultPosition.lat;
  const centerLng = lngParam ? parseFloat(lngParam) : defaultPosition.lng;

  useEffect(() => {
    setSpotData((prev) => ({ ...prev, position: { lat: centerLat, lng: centerLng } }));
    console.log(`緯度: ${spotData.position.lat}, 経度: ${spotData.position.lng}`);
  }, [location.search]);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng && latLng.lat() && latLng.lng()) {
      console.log(`緯度: ${latLng.lat()}, 経度: ${latLng.lng()}`);
      setSpotData((prev) => ({ ...prev, position: { lat: latLng.lat(), lng: latLng.lng() } }));
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
          lat: spotData.position.lat ? spotData.position.lat : defaultPosition.lat,
          lng: spotData.position.lng ? spotData.position.lng : defaultPosition.lng,
        },
        fullscreenControl: false,
      }}
      onClick={onMapClick}
    >
      <Marker position={{ lat: spotData.position.lat, lng: spotData.position.lng }} />
    </GoogleMap>
  );
}

export default Map;
