import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

function RegisterButton({ isDisabled }: { isDisabled: boolean }) {
  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    display: 'block',
  };
  return (
    <Link to='/spots' style={linkStyle}>
      <Fab disabled={isDisabled} color='primary' aria-label='add'>
        <AddIcon />
      </Fab>
    </Link>
  );
}

export default RegisterButton;
