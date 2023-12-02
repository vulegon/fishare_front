import React, { useState } from 'react';
import Header from '../../../features/headers/Header';
import { Typography, Box } from '@mui/material';
import {
  ImageItem,
  Description,
  SpotName,
  CatchableFish,
  LocationSelector,
  SubmmitButton,
  ImageUploader,
  FishingTypeCheckBox,
} from '../../../features/spots/components/index';
import { createSpot } from '../../../api/spot';
import HelpText from '../../../components/HelpText';
import { ErrorMessages } from '../../../types/ErrorMessage';
import ErrorMessageText from '../../../components/ErrorMessageText';
import { useNavigate } from 'react-router-dom';
import { defaultPosition } from '../../../utils/constants/defalutPosition';
import { SpotData } from '../../../features/spots/types/SpotData';
import Map from '../../../features/spots/create/Map';

function SpotCreatePage() {
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({});
  const navigate = useNavigate();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpotData((prev) => ({ ...prev, isLoading: true }));
    const response = await createSpot({
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
      navigate('/', { state: { status: 'success', message: '釣り場を登録しました' } });
    } else {
      setIsErrorMessageOpen(true);
      const data = await response.json();
      console.log(data);
      setErrorMessage(data.details);
      console.log(data.details);
    }
    setSpotData((prev) => ({ ...prev, isLoading: false }));
  };

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
          釣り場の登録
        </Typography>
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
          <ImageUploader setSpotData={setSpotData} />
          {isErrorMessageOpen && <ErrorMessageText fieldKey={'images'} errors={errorMessage} />}
          <ImageItem spotData={spotData} setSpotData={setSpotData} />
          <SubmmitButton isLoading={spotData.isLoading} buttonText='送信'></SubmmitButton>
        </form>
        <Box sx={{ height: 300 }}></Box>
      </div>
    </div>
  );
}

export default SpotCreatePage;
