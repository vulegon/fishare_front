import React from 'react';
import TextField from '@mui/material/TextField';

function InputTextField({
  label,
  value,
  setState,
}: {
  label: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  return (
    <TextField
      label={label}
      variant='outlined'
      value={value}
      onChange={handleOnChange}
      margin='normal'
      required
      fullWidth
    />
  );
}

export default InputTextField;
