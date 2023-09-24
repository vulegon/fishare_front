import React from 'react';
import Typography from '@mui/material/Typography';

function FormTitle({ value }: { value: string }) {
  return (
    <Typography variant='h4' gutterBottom>
      {value}
    </Typography>
  );
}

export default FormTitle;
