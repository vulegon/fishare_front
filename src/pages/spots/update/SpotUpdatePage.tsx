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
import { useNavigate } from 'react-router-dom';

function SpotUpdatePage() {
  const { spot_id } = useParams();
  const [spot, setSpot] = useState({
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
    isLoading: false,
  });
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({});
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
      setSpot((prev) => ({ ...spot, isLoading: true }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <form style={{ width: '700px' }} onSubmit={handleSubmit}>
        </form>
        <Box sx={{ height: 300 }}></Box>
      </div>
    </div>
  );
}

export default SpotUpdatePage;
