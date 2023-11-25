import React from 'react';
import TextField from '@mui/material/TextField';
import { SpotData } from '../types/SpotData';

function SpotDescription({
  spotData,
  setSpotData,
}: {
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpotData((prev) => ({ ...prev, description: event.target.value }));
  };
  return (
    <TextField
      label='説明'
      multiline
      rows={5}
      variant='outlined'
      value={spotData.description}
      onChange={handleDescriptionChange}
      margin='normal'
      required
      fullWidth
    />
  );
}

export default SpotDescription;
