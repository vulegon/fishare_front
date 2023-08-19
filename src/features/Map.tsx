import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { mapContainerStyle, mapOptions } from './defaultMapOption';
import { MarkerPosition } from '../types/types';
import SpotRegisterButton from './SpotRegisterButton';
import Header from '../Header';
import { getSpots } from '../services/apiClient';
import SpotDetail from './SpotDetail';

function Map() {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({ lat: undefined, lng: undefined });
  const [spotRegisterButtonIsDisabled, setSpotRegisterButtonIsDisabled] = useState<boolean>(true);
  const [spotIsShow, setIsSpotShow] = useState<boolean>(false);

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
  interface Spot {
    id: string;
    lat: number;
    lng: number;
  }

  const [spots, setSpots] = useState<Spot[]>([]);

  const fetchSpots = async () => {
    try {
      const response = await getSpots();
      if (response.status === 200) {
        const data = await response.json();
        setSpots(data.spots);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  const handleMarkerClick = (event: any) => {
    setIsSpotShow(true);
  };

  return (
    <div>
      <Header />
      <GoogleMap mapContainerStyle={mapContainerStyle()} options={mapOptions} onClick={onMapClick}>
        {spots.map((spot) => (
          <Marker key={spot.id.toString()} position={{ lat: spot.lat, lng: spot.lng }} onClick={handleMarkerClick} />
        ))}
        {markerPosition.lat && markerPosition.lng && (
          <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
        )}
        <div style={{ position: 'absolute', bottom: '20px', right: '70px' }}>
          <SpotRegisterButton isDisabled={spotRegisterButtonIsDisabled} markerPosition={markerPosition} />
        </div>
        {spotIsShow && <SpotDetail spotIsShow={spotIsShow} setIsSpotShow={setIsSpotShow} />}
      </GoogleMap>
    </div>
  );
}

export default Map;
