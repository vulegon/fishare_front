import React, { useState, useEffect } from 'react';
import { Spot } from '../../types/Spot';
import Header from '../../features/headers/Header';
import { getCurrentUser } from '../../api/user';
import { useLocation } from 'react-router-dom';
import { SpotsDataContext } from '../../contexts/spots/SpotsDataContext';
import Map from '../../features/root/Map';
import SnackBar from '../../features/root/SnackBar';
import { AlertMessage } from '../../types/AlertMessage';
import { AlertMessageContext } from '../../contexts/alertMessage/alertMessageContext';

function RootPage() {
  const [spotsData, setSpotsData] = useState({ spots: [] as Spot[], isLoading: true });
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({ status: 'info', message: '' });

  const getFlashMessage = () => {
    const state = location.state;
    if (!state) return;
    const newFlashMessage: AlertMessage = { status: state.status, message: state.message };
    setAlertMessage(newFlashMessage);
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
        <AlertMessageContext.Provider value={{ alertMessage, setAlertMessage }}>
          <Header />
          {alertMessage.message !== '' && (
            <SnackBar></SnackBar>
          )}
          <Map />
        </AlertMessageContext.Provider>
      </SpotsDataContext.Provider>
    </div>
  );
}

export default RootPage;
