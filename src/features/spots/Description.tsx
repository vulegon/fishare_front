import React from 'react';
import TextField from '@mui/material/TextField';

function SpotDescription({
  description,
  setDescription,
}: {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  return (
    <TextField
      label='説明'
      multiline
      rows={5}
      variant='outlined'
      value={description}
      onChange={handleDescriptionChange}
      margin='normal'
      required
      fullWidth
    />
  );
}

export default SpotDescription;
