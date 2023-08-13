import React from 'react';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

function AlertMessage({ message, severity }: { message: string; severity: AlertColor }) {
  return (
    <Alert severity={severity}>
      {message}
    </Alert>
  );
}

export default AlertMessage;
