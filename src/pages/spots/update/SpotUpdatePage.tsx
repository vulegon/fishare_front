import React, { useState, useEffect } from 'react';
import Header from '../../../features/headers/Header';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSpotShow, updateSpot } from '../../../api/spot';
import {
  ImageItem,
  Description,
  SpotName,
  CatchableFish,
  LocationSelector,
  SubmmitButton,
  ImageUploader,
  Map,
  FishingTypeCheckBox,
} from '../../../features/spots/components/index';
import HelpText from '../../../components/HelpText';
import { ErrorMessages } from '../../../types/ErrorMessage';
import ErrorMessageText from '../../../components/ErrorMessageText';
import { useNavigate } from 'react-router-dom';
import { SpotData } from '../../../features/spots/types/SpotData';
import { defaultPosition } from '../../../utils/constants/defalutPosition';

function SpotUpdatePage() {
  const { spot_id } = useParams();
  const [spotData, setSpotData] = useState<SpotData>({
    id: '',
    name: '',
    description: '',
    position: {
      latitude: defaultPosition.latitude,
      longitude: defaultPosition.longitude,
    },
    fish: [],
    fishingTypes: [],
    images: [],
    location: '',
    isLoading: false,
  });
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({});
  const [isInitLoading, setIsInitLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchSpotShow = async () => {
    try {
      if (spot_id === undefined || spot_id === null) {
        // spot_id が undefined または null の場合の処理
        console.log('spot_id is undefined or null');
        return;
      }
      const response = await getSpotShow(spot_id);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        const responseSpot = data.spot;
        setSpotData((prev)=>({
          ...prev,
          id: responseSpot.id,
          name: responseSpot.name,
          description: responseSpot.description,
          position: {
            latitude: responseSpot.latitude,
            longitude: responseSpot.longitude,
          },
          location: responseSpot.location,
          fish: responseSpot.fish,
          fishingTypes: responseSpot.fishing_types,
          images: responseSpot.images,
        }));
      }
    } catch (e) {
      console.log(e);
    }
      setIsInitLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpotData((prev) => ({ ...prev, isLoading: true }));
    const response = await updateSpot({
      id: spotData.id,
      name: spotData.name,
      description: spotData.description,
      images: spotData.images,
      location: spotData.location,
      catchableFish: spotData.fish,
      latitude: String(spotData.position.latitude),
      longitude: String(spotData.position.longitude),
      fishingTypes: spotData.fishingTypes,
    });
    if (response.status === 200) {
      setIsErrorMessageOpen(false);
      navigate('/', { state: { status: 'success', message: '釣り場を更新しました' } });
    } else {
      setIsErrorMessageOpen(true);
      const data = await response.json();
      console.log(data);
      setErrorMessage(data.details);
      console.log(data.details);
    }
    setSpotData((prev) => ({ ...prev, isLoading: false }));
  };

  useEffect(() => {
    fetchSpotShow();
  }, [spotData.isLoading]);
  return (
    <div>
      <Header isShowSearchSpot={false} />
      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4' gutterBottom>
          釣り場の編集
        </Typography>
        {!isInitLoading && (
          <>
            <HelpText value={'地図のマーカーを動かすこともできます'}></HelpText>
            <Map spotData={spotData} setSpotData={setSpotData} />
            {isErrorMessageOpen && <ErrorMessageText fieldKey={'str_latitude'} errors={errorMessage} />}
            {isErrorMessageOpen && <ErrorMessageText fieldKey={'str_longitude'} errors={errorMessage} />}
            <form style={{ width: '700px' }} onSubmit={handleSubmit}>
              <SpotName spotData={spotData} setSpotData={setSpotData} />
              {isErrorMessageOpen && <ErrorMessageText fieldKey={'name'} errors={errorMessage} />}
              <HelpText value={'必ず候補から選択してください。選択しない場合は登録されません'}></HelpText>
              <CatchableFish spotData={spotData} setSpotData={setSpotData} />
              {isErrorMessageOpen && <ErrorMessageText fieldKey={'fish'} errors={errorMessage} />}
              <LocationSelector spotData={spotData} setSpotData={setSpotData} />
              {isErrorMessageOpen && <ErrorMessageText fieldKey={'location'} errors={errorMessage} />}
              <FishingTypeCheckBox spotData={spotData} setSpotData={setSpotData} />
              {isErrorMessageOpen && <ErrorMessageText fieldKey={'fishing_types'} errors={errorMessage} />}
              <Description spotData={spotData} setSpotData={setSpotData} />
              {isErrorMessageOpen && <ErrorMessageText fieldKey={'description'} errors={errorMessage} />}
              <ImageUploader spotData={spotData} setSpotData={setSpotData} />
              {isErrorMessageOpen && <ErrorMessageText fieldKey={'images'} errors={errorMessage} />}
              <ImageItem spotData={spotData} setSpotData={setSpotData} />
              <SubmmitButton isLoading={spotData.isLoading} buttonText='送信'></SubmmitButton>
            </form>
          </>
        )}
        <Box sx={{ height: 300 }}></Box>
      </div>
    </div>
  );
}

export default SpotUpdatePage;
