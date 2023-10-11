import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { mapContainerStyle, mapOptions } from './defaultMapOption';
import { MarkerPosition } from '../types/Spot';
import SpotRegisterButton from './SpotRegisterButton';
import Header from './headers/Header';
import { getSpots } from '../api/spot';
import SpotDetail from './SpotDetail';
import { Spot } from '../types/Spot';
import { getCurrentUser } from '../api/user';

function Map() {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({ lat: undefined, lng: undefined });
  const [spotRegisterButtonIsDisabled, setSpotRegisterButtonIsDisabled] = useState<boolean>(true);
  const [spotIsShow, setIsSpotShow] = useState<boolean>(false);
  const [detailSpot, setDetailSpot] = useState<Spot | null>(null);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [isSpotsLoading, setIsSpotsLoading] = useState<boolean>(true);

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

  const fetchSpots = async () => {
    try {
      const response = await getSpots();
      if (response.status === 200) {
        const data = await response.json();
        setSpots(data.spots);
        console.log(data)
      }
    } catch (e) {
      console.log(e);
    }
    setIsSpotsLoading(false)
  };

  useEffect(() => {
    fetchSpots();
    getCurrentUser();
  }, []);
  const handleMarkerClick = (spot: Spot) => {
    setIsSpotShow(true);
    setDetailSpot(spot);
  };

  return (
    <div>
      <Header />
      <GoogleMap mapContainerStyle={mapContainerStyle()} options={mapOptions} onClick={onMapClick}>
        {!isSpotsLoading && spots.map((spot) => (
          <Marker
            key={spot.id.toString()}
            position={{ lat: spot.lat, lng: spot.lng }}
            onClick={() => handleMarkerClick(spot)}
          />
        ))}
        {markerPosition.lat && markerPosition.lng && (
          <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
        )}
        <div style={{ position: 'absolute', bottom: '20px', right: '70px' }}>
          <SpotRegisterButton isDisabled={spotRegisterButtonIsDisabled} markerPosition={markerPosition} />
        </div>
        {spotIsShow && <SpotDetail spotIsShow={spotIsShow} setIsSpotShow={setIsSpotShow} detailSpot={detailSpot} />}
      </GoogleMap>
    </div>
  );
}

export default Map;
