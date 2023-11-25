import React from 'react';
import TextField from '@mui/material/TextField';
import { SpotData } from '../types/SpotData';

function SpotName({
  spotData,
  setSpotData,
}: {
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpotData((prev) => ({ ...prev, name: event.target.value }));
  };
  return (
    <TextField
      label='名前'
      multiline
      rows={1}
      variant='outlined'
      value={spotData.name}
      onChange={handleNameChange}
      margin='normal'
      required
      fullWidth
    />
  );
}

export default SpotName;
