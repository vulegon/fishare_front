import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { getFish } from '../../../api/fish';
import { SpotData } from '../types/SpotData';

function CatchableFishInput({
  spotData,
  setSpotData,
}: {
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const [fish, setFish] = useState<string[]>([]);
  const getFishNames = async () => {
    const response = await getFish();
    const data = await response.json();
    setFish(data.fish);
  };

  const handleCatchableFishChange = (event: React.ChangeEvent<unknown>, newValue: string[]) => {
    setSpotData((prev) => ({ ...prev, fish: newValue }));
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
      value={spotData.fish}
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
