import React, { useState } from 'react';
import Header from '../headers/Header';
import { Typography, Box } from '@mui/material';
import { MarkerPosition, Image } from '../../types/Spot';
import {
  ImageItem,
  Description,
  SpotName,
  CatchableFish,
  LocationSelector,
  SubmmitButton,
  ImageUploader,
  SpotMap,
  FishingTypeCheckBox,
} from './index';
import { createSpot } from '../../api/spot';
import HelpText from '../../components/HelpText';
import { ErrorMessages } from '../../types/ErrorMessage';
import ErrorMessageText from '../../components/ErrorMessageText';
import { useNavigate } from 'react-router-dom';

function SpotCreateFrom() {
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [imageCount, setImageCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    lat: undefined,
    lng: undefined,
  });
  const [location, setLocation] = useState<string>('');
  const [catchableFish, setCatchableFish] = useState<string[]>([]);
  const [fishingTypes, setFishingTypes] = useState<string[]>([]);
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({});
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await createSpot({
      name: name,
      description: description,
      images: images,
      location: location,
      catchableFish: catchableFish,
      latitude: String(markerPosition.lat),
      longitude: String(markerPosition.lng),
      fishingTypes: fishingTypes,
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
    setIsLoading(false);
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
        <SpotMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
        {isErrorMessageOpen && <ErrorMessageText fieldKey={'str_latitude'} errors={errorMessage} />}
        {isErrorMessageOpen && <ErrorMessageText fieldKey={'str_longitude'} errors={errorMessage} />}
        <form style={{ width: '700px' }} onSubmit={handleSubmit}>
          <SpotName name={name} setName={setName} />
          {isErrorMessageOpen && <ErrorMessageText fieldKey={'name'} errors={errorMessage} />}
          <HelpText value={'必ず候補から選択してください。選択しない場合は登録されません'}></HelpText>
          <CatchableFish setCatchableFish={setCatchableFish} />
          {isErrorMessageOpen && <ErrorMessageText fieldKey={'fish'} errors={errorMessage} />}
          <LocationSelector location={location} setLocation={setLocation} />
          {isErrorMessageOpen && <ErrorMessageText fieldKey={'location'} errors={errorMessage} />}
          <FishingTypeCheckBox location={location} fishingTypes={fishingTypes} setFishingTypes={setFishingTypes} />
          {isErrorMessageOpen && <ErrorMessageText fieldKey={'fishing_types'} errors={errorMessage} />}
          <Description description={description} setDescription={setDescription} />
          {isErrorMessageOpen && <ErrorMessageText fieldKey={'description'} errors={errorMessage} />}
          <ImageUploader imageCount={imageCount} setImageCount={setImageCount} images={images} setImages={setImages} />
          {isErrorMessageOpen && <ErrorMessageText fieldKey={'images'} errors={errorMessage} />}
          <ImageItem images={images} setImages={setImages} />
          <SubmmitButton isLoading={isLoading} buttonText='送信'></SubmmitButton>
        </form>
        <Box sx={{ height: 300 }}></Box>
      </div>
    </div>
  );
}

export default SpotCreateFrom;
