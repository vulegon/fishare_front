import React from 'react';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

function AlertMessage({ key, message, severity }: { key: number; message: string; severity: AlertColor }) {
  return (
    <Alert key={key} severity={severity}>
      {message}
    </Alert>
  );
}

export default AlertMessage;
