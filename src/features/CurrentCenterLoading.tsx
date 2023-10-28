import React, { useState } from 'react';
import { Box, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CurrentCenterLoading() {
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Box sx={{ width: 100 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message='現在地を読み込み中...'
        action={action}
      ></Snackbar>
    </Box>
  );
}

export default CurrentCenterLoading;
