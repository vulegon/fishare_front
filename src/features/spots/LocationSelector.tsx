import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function FishingTypeSelector({
  location,
  setLocation,
}: {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  return (
    <RadioGroup
      aria-labelledby='demo-radio-buttons-group-label'
      name='radio-buttons-group'
      row
      onChange={handleLocationChange}
    >
      <FormControlLabel value='sea' control={<Radio />} label='海釣り' />
      <FormControlLabel value='river' control={<Radio />} label='川釣り' />
    </RadioGroup>
  );
}

export default FishingTypeSelector;
