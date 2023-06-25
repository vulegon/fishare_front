import React from 'react';
import Alert from '@mui/material/Alert';

function AlertMessage({ key, message }: { key: number; message: string }) {
  return <Alert key={key}>{message}</Alert>;
}

export default AlertMessage;
