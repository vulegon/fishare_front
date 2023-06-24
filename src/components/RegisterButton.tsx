import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function RegisterButton({ isDisabled }: {isDisabled: boolean}) {
  return (
    <Fab disabled={isDisabled} color='primary' aria-label='add'>
      <AddIcon />
    </Fab>
  );
}

export default RegisterButton;
