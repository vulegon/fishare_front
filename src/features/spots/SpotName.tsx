import React from 'react';
import TextField from '@mui/material/TextField';

function SpotName({
  name,
  setName,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <TextField
      label='名前'
      multiline
      rows={1}
      variant='outlined'
      value={name}
      onChange={handleNameChange}
      margin='normal'
      required
      fullWidth
    />
  );
}

export default SpotName;
