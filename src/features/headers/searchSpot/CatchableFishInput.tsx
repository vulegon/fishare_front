import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { getFish } from '../../../api/fish';

function CatchableFishInput({
  setIsCatchableFishSelected,
  setCatchableFish,
}: {
  setIsCatchableFishSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setCatchableFish: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [fish, setFish] = useState<string[]>([]);
  const getFishNames = async () => {
    const response = await getFish();
    const data = await response.json();
    setFish(data.fish);
  };
  const handleCathableFishOnChange = (event: React.ChangeEvent<unknown>, newValue: string[]) => {
    setIsCatchableFishSelected(true);
    setCatchableFish(newValue);
  };

  useEffect(() => {
    getFishNames();
  }, []);
  return (
    <Autocomplete
      multiple
      id='tags-filled'
      options={fish}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <Chip variant='outlined' label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} variant='standard' label='釣れる魚' />}
      onChange={handleCathableFishOnChange}
    />
  );
}

export default CatchableFishInput;
