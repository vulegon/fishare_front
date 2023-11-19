import React from 'react';
import { Typography } from '@mui/material';
import LeftMargin from './components/LeftMargin';

function SpotName({ spotName }: { spotName: string }) {
  return (
    <LeftMargin>
      <Typography variant='h5' gutterBottom sx={{ fontWeight: 600, marginBottom: 0 }}>
        {spotName}
      </Typography>
    </LeftMargin>
  );
}

export default SpotName;
