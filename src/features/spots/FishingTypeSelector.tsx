import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function FishingTypeSelector({
  fishingType,
  setFishingType,
}: {
  fishingType: string;
  setFishingType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleFishingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFishingType(event.target.value);
    console.log(fishingType);
  };
  return (
    <RadioGroup
      aria-labelledby='demo-radio-buttons-group-label'
      name='radio-buttons-group'
      row
      onChange={handleFishingTypeChange}
    >
      <FormControlLabel value='sea' control={<Radio />} label='海釣り' />
      <FormControlLabel value='river' control={<Radio />} label='川釣り' />
    </RadioGroup>
  );
}

export default FishingTypeSelector;
