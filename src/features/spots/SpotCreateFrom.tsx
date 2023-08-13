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
import { useGetUserId } from '../../services/auth';
import AlertMessage from '../../components/AlertMessage';
import { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';


I18n.putVocabularies(translations);
I18n.setLanguage('ja');
Amplify.configure(awsExports);

function SpotCreateFrom() {
  const [description, setDescription] = useState<string>('');
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
  const userId = useGetUserId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('description', description);
    formData.append('str_latitude', String(markerPosition.lat));
    formData.append('str_longitude', String(markerPosition.lng));
    formData.append('user_id', userId);
    images.forEach((image) => formData.append('images[]', image.file));
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
      <Header />
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
        <SpotCreateFormMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
        <form style={{ width: '700px' }} onSubmit={handleSubmit}>
          <SpotDescription description={description} setDescription={setDescription} />
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
        <Box sx={{ height: 300 }}></Box>
      </div>
    </div>
  );
}

export default withAuthenticator(SpotCreateFrom);
