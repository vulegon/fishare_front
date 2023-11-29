import React, { useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { SpotData } from '../types/SpotData';

function Map({
  spotData,
  setSpotData,
}: {
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
  }) {

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng && latLng.lat() && latLng.lng()) {
      setSpotData((prev) => ({ ...prev, position: { latitude: latLng.lat(), longitude: latLng.lng() } }));
    }
  };

  const mapOptionsMemo = useMemo(() => {
    return {
      zoom: 15,
      center: {
        lat: spotData.position.latitude,
        lng: spotData.position.longitude,
      },
      fullscreenControl: false,
    };
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{
        height: '500px',
        width: '700px',
      }}
      options={mapOptionsMemo}
      onClick={onMapClick}
    >
      <Marker position={{ lat: spotData.position.latitude, lng: spotData.position.longitude }} />
    </GoogleMap>
  );
}

export default Map;
