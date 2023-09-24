import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function InputPasswordField({
  label,
  value,
  setState,
}: {
  label: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <TextField
      type={isPasswordShow ? 'text' : 'password'}
      label={label}
      variant='outlined'
      value={value}
      onChange={handleOnChange}
      required
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={togglePasswordVisibility}
              edge='end'
              aria-label={isPasswordShow ? 'Hide password' : 'Show password'}
            >
              {isPasswordShow ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
}

export default InputPasswordField;
