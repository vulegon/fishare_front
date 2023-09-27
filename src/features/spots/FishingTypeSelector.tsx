import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function FishingTypeSelector() {
  return (
    <RadioGroup aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group' row>
      <FormControlLabel value='海釣り' control={<Radio />} label='海釣り' />
      <FormControlLabel value='川釣り' control={<Radio />} label='川釣り' />
    </RadioGroup>
  );
}

export default FishingTypeSelector
