import React from 'react';
import { Typography } from '@mui/material';
import LeftMargin from './components/LeftMargin';

function SpotDescription({ spotDescription }: { spotDescription: string }) {
  return (
    <LeftMargin>
      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
        説明
      </Typography>
      <Typography variant='button' display='block' gutterBottom sx={{ color: 'grey' }}>
        {spotDescription}
      </Typography>
    </LeftMargin>
  );
}

export default SpotDescription;
