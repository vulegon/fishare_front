import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertColor } from '@mui/material';

function FlashMessage({
  status,
  message,
  isFlashMessageOpen,
  setIsFlashMessageOpen,
}: {
  status: AlertColor;
  message: string;
  isFlashMessageOpen: boolean;
  setIsFlashMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    setIsFlashMessageOpen(false);
  };
  return (
    <Snackbar
      open={isFlashMessageOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default FlashMessage;
