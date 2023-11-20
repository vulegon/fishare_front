import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { getFish } from '../../../api/fish';

function CatchableFishInput({
  setCatchableFish,
}: {
  setCatchableFish: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [fish, setFish] = useState<string[]>([]);
  const getFishNames = async () => {
    const response = await getFish();
    const data = await response.json();
    setFish(data.fish);
  };

  const handleCatchableFishChange = (event: React.ChangeEvent<unknown>, newValue: string[]) => {
    setCatchableFish(newValue);
  };

  useEffect(() => {
    getFishNames();
  }, []);
  return (
    <Autocomplete
      multiple
      id='tags-outlined'
      options={fish}
      freeSolo
      onChange={handleCatchableFishChange}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <Chip variant='outlined' label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} label='釣れる魚' />}
    />
  );
}

export default CatchableFishInput;
