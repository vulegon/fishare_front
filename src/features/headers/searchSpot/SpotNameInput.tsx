import React from 'react';
import { TextField } from '@mui/material';
import { SearchOptions } from './types';

function SpotNameInput({
  options,
  setOptions,
}: {
  options: SearchOptions;
  setOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
}) {
  const handleSpotNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, optionSpotName: e.target.value });
  };

  return (
    <TextField
      sx={{ width: '100%' }}
      id='spot-name-search'
      label='名前'
      type='search'
      variant='standard'
      onChange={handleSpotNameOnChange}
      value={options.optionSpotName}
    />
  );
}

export default SpotNameInput;
