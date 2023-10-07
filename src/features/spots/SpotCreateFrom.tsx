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
  FormSpace,
  SubmmitButton,
  ImageUploader,
  SpotMap,
  FishingTypeCheckBox,
} from './index';
import { createSpot } from '../../api/spot';

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

    const data = await response.json();
    console.log(data);
    console.log(data.message[0]);
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
        <SpotMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
        <form style={{ width: '700px' }} onSubmit={handleSubmit}>
          <SpotName name={name} setName={setName} />
          <FormSpace></FormSpace>
          <CatchableFish catchableFish={catchableFish} setCatchableFish={setCatchableFish} />
          <FormSpace></FormSpace>
          <LocationSelector location={location} setLocation={setLocation} />
          <FishingTypeCheckBox fishingTypes={fishingTypes} setFishingTypes={setFishingTypes} />
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
