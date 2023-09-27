import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { fishNames } from '../../master/catchableFish';
import { TextField } from '@mui/material';

function CatchableFishInput() {
  return (
    <Autocomplete
      multiple
      id='tags-filled'
      options={fishNames.map((option) => option.name)}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <Chip variant='outlined' label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} variant='standard' label='釣れる魚' />}
    />
  );
}

export default CatchableFishInput;
