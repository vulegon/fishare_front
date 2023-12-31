import React, { useEffect, useState, useMemo } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setSpotData((prev) => ({ ...prev, position: { latitude: centerLat, longitude: centerLng } }));
    setIsLoading(true);
  }, [centerLat, centerLng]);

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
  }, [isLoading]);

  return (
    <GoogleMap
      mapContainerStyle={{
        height: '500px',
        width: '700px',
      }}
      options={mapOptionsMemo}
      onClick={onMapClick}
    >
      {isLoading && <Marker position={{ lat: spotData.position.latitude, lng: spotData.position.longitude }} />}
    </GoogleMap>
  );
}

export default Map;
