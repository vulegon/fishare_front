import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { fishNames } from '../../master/catchableFish';
import { TextField } from '@mui/material';

function CatchableFishInput({
  catchableFish,
  setCatchableFish,
}: {
  catchableFish: string[];
  setCatchableFish: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleCatchableFishChange = (event: React.ChangeEvent<unknown>, newValue: string[]) => {
    setCatchableFish(newValue);
  };
  return (
    <Autocomplete
      multiple
      id='tags-outlined'
      options={fishNames.map((option) => option.name)}
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
