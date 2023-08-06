import React, { useState, useRef } from 'react';
import { Amplify, I18n } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';
import { translations } from '@aws-amplify/ui';
import Header from '../../Header';
import Typography from '@mui/material/Typography';
import SpotCreateFormMap from './SpotCreateFormMap';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

I18n.putVocabularies(translations);
I18n.setLanguage('ja');
Amplify.configure(awsExports);

function SpotCreateFrom() {
  interface Image {
    file: File;
    img: string;
    title: string;
    id: number;
  }
  const [images, setImages] = useState<Image[]>([]);
  const [description, setDescription] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageCount, setImageCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [severity, setSeverity] = useState<string>('');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string[]>([]);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        console.log(file.name);
        console.log(result);
        const newImage = { file: file, img: result, title: file.name, id: imageCount };
        setImages([...images, newImage]);
        setImageCount(imageCount + 1);
      };
    }
  };

  const handleCloseIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const delete_image_id = parseInt(event.currentTarget.id);
    const result = images.filter((item) => item.id !== delete_image_id);
    console.log(result);
    setImages(result);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('description', description);
    formData.append('latitude', marker.lat);
    formData.append('longitude', marker.lng);
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
        <SpotCreateFormMap />
        <form style={{ width: '700px' }} onSubmit={handleSubmit}>
          <TextField
            label='説明'
            multiline
            rows={5}
            variant='outlined'
            value={description}
            onChange={handleDescriptionChange}
            margin='normal'
            required
            fullWidth
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <input accept='image/*' id='icon-button-file' type='file' style={{ display: 'none' }} />
            <Button
              variant='outlined'
              style={{ borderRadius: 50, width: '80%', fontSize: 16 }}
              onClick={() => inputRef.current?.click()}
            >
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={handleFileSelect}
              />
              <AddAPhotoIcon style={{ marginRight: '8px' }} />
              写真を追加
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <ImageList sx={{ width: '100%', height: 500 }} cols={3} rowHeight={230}>
              {images.map((image) => (
                <ImageListItem key={image.img} sx={{ height: 250, width: 200 }}>
                  <img
                    src={`${image.img}`}
                    srcSet={`${image.img}`}
                    alt={image.title}
                    loading='lazy'
                    id={image.id.toString()}
                    style={{ maxHeight: '100%', width: 'auto', objectFit: 'cover' }}
                  />
                  <CloseIcon
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 100,
                      background: 'white',
                      borderRadius: 50,
                      cursor: 'pointer',
                    }}
                    onClick={handleCloseIconClick}
                    id={image.id.toString()}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
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
