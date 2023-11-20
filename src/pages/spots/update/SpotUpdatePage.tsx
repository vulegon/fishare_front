import React, { useState, useEffect } from 'react';
import Header from '../../../features/headers/Header';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ShowSpot } from '../../../types/ShowSpot';
import { getSpotShow, updateSpot } from '../../../api/spot';
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
} from '../../../features/spots/components/index';
import HelpText from '../../../components/HelpText';
import { ErrorMessages } from '../../../types/ErrorMessage';
import ErrorMessageText from '../../../components/ErrorMessageText';
import { MarkerPosition } from '../../../types/Spot';
import { Image } from '../../../types/Spot';
import { useNavigate } from 'react-router-dom';

function SpotUpdatePage() {
  const { spot_id } = useParams();
  const [spot, setSpot] = useState<ShowSpot>({
    id: '',
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    fish: [],
    fishing_types: [],
    images: [],
    location: '',
    editable: false,
  });
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({});
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
        setSpot({
          ...spot,
          id: responseSpot.id,
          name: responseSpot.name,
          description: responseSpot.description,
          location: responseSpot.location,
          fish: responseSpot.fish,
          fishing_types: responseSpot.fishing_types,
          images: responseSpot.images,
          editable: responseSpot.editable,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (spot_id === null || spot_id === undefined) {
      console.log('spot_idは不正な値です');
      return;
    }
    const response = await updateSpot({
      id: spot_id,
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
      navigate('/', { state: { status: 'success', message: '釣り場を更新しました' } });
    } else {
      setIsErrorMessageOpen(true);
      const data = await response.json();
      console.log(data);
      setErrorMessage(data.details);
      console.log(data.details);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSpotShow();
  }, []);
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

export default SpotUpdatePage;
