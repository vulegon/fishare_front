import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { mapContainerStyle } from './defaultMapOption';
import { MarkerPosition, Spot } from '../../types/Spot';
import SpotRegisterButton from './SpotRegisterButton';
import { getSpots } from '../../api/spot';
import SpotShow from './showSpot/SpotShow';
import { MapOptions } from '../../types/Map';
import CurrentCenterLoading from './CurrentCenterLoading';

function Map() {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({ lat: undefined, lng: undefined });
  const [spotRegisterButtonIsDisabled, setSpotRegisterButtonIsDisabled] = useState<boolean>(true);
  const [spotIsShow, setIsSpotShow] = useState<boolean>(false);
  const [showSpot, setShowSpot] = useState<Spot | null>(null);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [isSpotsLoading, setIsSpotsLoading] = useState<boolean>(true);
  const [isCenterLoading, setIsCenterLoading] = useState<boolean>(true);
  const [mapOptions, setMapOptions] = useState<MapOptions>({
    zoom: 15,
    center: { lat: 36.063053704526226, lng: 136.22288055523217 },
    fullscreenControl: false,
  });

  // GoogleMapをクリックしたらマーカーを置くのと釣り場を登録するボタンを押せるようにします
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

  //データベースに登録されている釣り場を取得
  const fetchSpots = async () => {
    try {
      const response = await getSpots();
      if (response.status === 200) {
        const data = await response.json();
        setSpots(data.spots);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
    setIsSpotsLoading(false);
  };

  // ブラウザの現在位置を取得します
  // https://syncer.jp/how-to-use-geolocation-apiを参考
  const getCurrentPosition = async () => {
    if (!navigator.geolocation) return; //Geolocation APIに対応していない場合はデフォルト値を採用する
    function successGetCurrentPosition(position: GeolocationPosition) {
      const newCenter = { lat: position.coords.latitude, lng: position.coords.longitude };
      const newMapOptions = { ...mapOptions, center: newCenter };
      setMapOptions(newMapOptions);
      setIsCenterLoading(false);
    }

    function failedGetCurrentPosition(error: GeolocationPositionError) {
      // エラーコード(error.code)の番号
      // 0:UNKNOWN_ERROR				原因不明のエラー
      // 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
      // 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
      // 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

      // エラー番号に対応したメッセージ
      const errorInfo = [
        '原因不明のエラーが発生しました…。',
        '位置情報の取得が許可されませんでした…。',
        '電波状況などで位置情報が取得できませんでした…。',
        '位置情報の取得に時間がかかり過ぎてタイムアウトしました…。',
      ];

      // エラー番号
      const errorNo = error.code;

      // エラーメッセージ
      const errorMessage = '[エラー番号: ' + errorNo + ']\n' + errorInfo[errorNo];
      console.log(errorMessage);
      setIsCenterLoading(false);
    }
    const optionObj = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 3600000,
    };
    navigator.geolocation.getCurrentPosition(successGetCurrentPosition, failedGetCurrentPosition, optionObj);
  };

  useEffect(() => {
    fetchSpots();
    getCurrentPosition();
  }, []);

  const handleMarkerClick = (spot: Spot) => {
    setIsSpotShow(true);
    setShowSpot(spot);
  };

  return (
    <>
      <GoogleMap mapContainerStyle={mapContainerStyle()} options={mapOptions} onClick={onMapClick}>
        {!isSpotsLoading &&
          spots.map((spot) => (
            <Marker
              key={spot.id.toString()}
              position={{ lat: spot.lat, lng: spot.lng }}
              onClick={() => handleMarkerClick(spot)}
            />
          ))}
        {markerPosition.lat && markerPosition.lng && (
          <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
        )}
        {isCenterLoading && <CurrentCenterLoading />}
        <div style={{ position: 'absolute', bottom: '20px', right: '70px' }}>
          <SpotRegisterButton isDisabled={spotRegisterButtonIsDisabled} markerPosition={markerPosition} />
        </div>
        {spotIsShow && <SpotShow spotIsShow={spotIsShow} setIsSpotShow={setIsSpotShow} showSpot={showSpot} />}
      </GoogleMap>
    </>
  );
}

export default Map;
