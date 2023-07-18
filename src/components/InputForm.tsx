import React from 'react';
import TextField from '@mui/material/TextField';

function InputForm({
  label,
  type,
  value,
  setValue,
  endAdornment,
}: {
  label: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
  endAdornment?: React.ReactNode;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <TextField
      label={label}
      type={type}
      variant='outlined'
      value={value}
      onChange={handleChange}
      margin='normal'
      required
      fullWidth
      InputProps={{
        endAdornment: endAdornment,
      }}
    />
  );
}

export default InputForm;
