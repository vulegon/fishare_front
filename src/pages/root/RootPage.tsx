import React, { useState, useEffect } from 'react';
import { Spot } from '../../types/Spot';
import Header from '../../features/headers/Header';
import { getCurrentUser } from '../../api/user';
import { useLocation } from 'react-router-dom';
import FlashMessage from '../../features/root/FlashMessage';
import { AlertColor } from '@mui/material';
import { SpotsContext } from '../../contexts/spots/SpotsContext';
import Map from '../../features/root/Map';

function RootPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
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
      <SpotsContext.Provider value={{ spots, setSpots }}>
        <Header />
        <FlashMessage
          status={flashMessage.status}
          message={flashMessage.message}
          isFlashMessageOpen={isFlashMessageOpen}
          setIsFlashMessageOpen={setIsFlashMessageOpen}
        ></FlashMessage>
        <Map />
      </SpotsContext.Provider>
    </div>
  );
}

export default RootPage;
