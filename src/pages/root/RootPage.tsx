import React, { useState, useEffect } from 'react';
import { Spot } from '../../types/Spot';
import Header from '../../features/headers/Header';
import { getCurrentUser } from '../../api/user';
import { useLocation } from 'react-router-dom';
import FlashMessage from '../../features/root/FlashMessage';
import { AlertColor } from '@mui/material';
import { SpotsDataContext } from '../../contexts/spots/SpotsDataContext';
import Map from '../../features/root/Map';

function RootPage() {
  const [spotsData, setSpotsData] = useState({ spots: [] as Spot[], isLoading: true });
  const location = useLocation();
  const [isFlashMessageOpen, setIsFlashMessageOpen] = useState<boolean>(false);
  const [flashMessage, setFlashMessage] = useState<flashMessages>({ status: 'info', message: '' });
  interface flashMessages {
    status: AlertColor;
    message: string;
  }

  const getFlashMessage = () => {
    const state = location.state;
    console.log(state);
    if (!state) return;
    setIsFlashMessageOpen(true);
    const newFlashMessage: flashMessages = { status: state.status, message: state.message };
    setFlashMessage(newFlashMessage);
  };

  useEffect(() => {
    getCurrentUser();
    getFlashMessage();
    return () => {
      const newLocation = { ...location };
      delete newLocation.state;
      window.history.replaceState(newLocation, '');
    };
  }, []);

  return (
    <div>
      <SpotsDataContext.Provider value={{ spotsData, setSpotsData }}>
        <Header />
        <FlashMessage
          status={flashMessage.status}
          message={flashMessage.message}
          isFlashMessageOpen={isFlashMessageOpen}
          setIsFlashMessageOpen={setIsFlashMessageOpen}
        ></FlashMessage>
        <Map />
      </SpotsDataContext.Provider>
    </div>
  );
}

export default RootPage;
