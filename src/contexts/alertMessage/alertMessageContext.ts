import React, { createContext } from 'react';
import { AlertMessage } from '../../types/AlertMessage';

export const AlertMessageContext = createContext(
  {} as {
    alertMessage: AlertMessage;
    setAlertMessage: React.Dispatch<React.SetStateAction<AlertMessage>>;
  }
);
