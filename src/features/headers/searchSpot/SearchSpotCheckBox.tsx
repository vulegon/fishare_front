import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

export default function SearchSpotCheckBox({ label }: { label: string }) {
  return (
    <>
      <Checkbox />
      <Typography variant='subtitle1' gutterBottom sx={{ marginBottom: 0 }}>
        {label}
      </Typography>
    </>
  );
}
