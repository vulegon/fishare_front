import React, { useState } from 'react';
import { Amplify, I18n } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';
import { translations } from '@aws-amplify/ui';
import Header from '../../Header';
import Typography from '@mui/material/Typography';
import SpotCreateFormMap from './SpotCreateFormMap';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { MarkerPosition } from '../../types/types';
import ImageUploader from './SpotImageUploader';
import { Image } from '../../types/types';
import SpotImageItem from './SpotImageItem';
import SpotDescription from './SpotDescription';

I18n.putVocabularies(translations);
I18n.setLanguage('ja');
Amplify.configure(awsExports);

function SpotCreateFrom() {
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [imageCount, setImageCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [severity, setSeverity] = useState<string>('');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string[]>([]);
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    lat: undefined,
    lng: undefined,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('description', description);
    formData.append('latitude', String(markerPosition.lat));
    formData.append('longitude', String(markerPosition.lng));
    images.forEach((image) => formData.append('images[]', image.file));
    fetch('http://localhost:3001/api/v1/spots', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          setSeverity('success');
        } else {
          setSeverity('error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.message[0]);
        if (Array.isArray(data.message)) {
          setResponseMessage(data.message);
        } else {
          setResponseMessage([data.message]);
        }
        setAlertOpen(true);
      });
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
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
        <SpotCreateFormMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
        <form style={{ width: '700px' }} onSubmit={handleSubmit}>
          <SpotDescription description={ description} setDescription={setDescription}/>
          <ImageUploader imageCount={imageCount} setImageCount={setImageCount} images={images} setImages={setImages} />
          <SpotImageItem images={images} setImages={setImages} />
          <Button
            type='submit'
            variant='contained'
            style={{
              borderRadius: 50,
              width: '80%',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              margin: '0 auto',
            }}
          >
            {isLoading ? <CircularProgress color='inherit' /> : '送信'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default withAuthenticator(SpotCreateFrom);
