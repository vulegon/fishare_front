import React from 'react'
import { TextField } from '@mui/material';

function SpotNameInput({
  spotName,
  setSpotName,
}: {
  spotName: string;
  setSpotName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSpotNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpotName(e.target.value)
  };

  return (
    <TextField
      sx={{ width: '100%' }}
      id='spot-name-search'
      label='名前'
      type='search'
      variant='standard'
      onChange={handleSpotNameOnChange}
    >
      {spotName}
    </TextField>
  );
}

export default SpotNameInput
