import React, { useState } from 'react';
import Header from '../headers/Header';
import { Typography, AlertColor, Box } from '@mui/material';
import { MarkerPosition } from '../../types/types';
import { Image } from '../../types/types';
import AlertMessage from '../../components/AlertMessage';
import {
  ImageItem,
  Description,
  SpotName,
  CatchableFish,
  FishingTypeSelector,
  FormSpace,
  SubmmitButton,
  ImageUploader,
  SpotMap,
} from './index';

function SpotCreateFrom() {
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [imageCount, setImageCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    lat: undefined,
    lng: undefined,
  });
  const [fishingType, setFishingType] = useState<string>('');
  const [catchableFish, setCatchableFish] = useState<string[]>(['']);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('str_latitude', String(markerPosition.lat));
    formData.append('str_longitude', String(markerPosition.lng));
    formData.append('fishing_type', fishingType);
    images.forEach((image) => formData.append('images[]', image.file));
    catchableFish.forEach((fish) => formData.append('fish[]', fish));
    console.log(formData);

    //formDataの場合はヘッダーを指定してはいけないため、apiClientは使わない。
    // https://zenn.dev/kariya_mitsuru/articles/25c9aeb27059e7
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/spots`, { method: 'POST', body: formData });
    response.status === 200 ? setSeverity('success') : setSeverity('error');

    const data = await response.json();
    console.log(data);
    console.log(data.message[0]);
    setResponseMessage(data.message);
    setAlertOpen(true);
    setIsLoading(false);
  };

  return (
    <div>
      <Header isShowSearchSpot={false} />
      {alertOpen && <AlertMessage message={responseMessage} severity={severity} />}
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
        <SpotMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
        <form style={{ width: '700px' }} onSubmit={handleSubmit}>
          <SpotName name={name} setName={setName} />
          <FormSpace></FormSpace>
          <CatchableFish catchableFish={catchableFish} setCatchableFish={setCatchableFish} />
          <FormSpace></FormSpace>
          <FishingTypeSelector fishingType={fishingType} setFishingType={setFishingType}></FishingTypeSelector>
          <Description description={description} setDescription={setDescription} />
          <ImageUploader imageCount={imageCount} setImageCount={setImageCount} images={images} setImages={setImages} />
          <ImageItem images={images} setImages={setImages} />
          <SubmmitButton isLoading={isLoading} buttonText='送信'></SubmmitButton>
        </form>
        <Box sx={{ height: 300 }}></Box>
      </div>
    </div>
  );
}

export default SpotCreateFrom;
