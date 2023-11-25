import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SpotData } from '../types/SpotData';

function FishingTypeSelector({
  setSpotData,
}: {
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpotData((prev) => ({ ...prev, location: event.target.value }));
  };
  return (
    <RadioGroup
      aria-labelledby='demo-radio-buttons-group-label'
      name='radio-buttons-group'
      row
      onChange={handleLocationChange}
    >
      <FormControlLabel value='海釣り' control={<Radio />} label='海釣り' />
      <FormControlLabel value='川釣り' control={<Radio />} label='川釣り' />
    </RadioGroup>
  );
}

export default FishingTypeSelector;
