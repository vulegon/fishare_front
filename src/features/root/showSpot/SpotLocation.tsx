import React from 'react'
import { Typography } from '@mui/material';
import LeftMargin from './components/LeftMargin';
import Chip from '@mui/material/Chip';

function SpotLocation({ spotLocation }: { spotLocation: string }) {
  return (
    <LeftMargin>
      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
        釣り場の種類
      </Typography>
      <Chip key={spotLocation} color='primary' label={spotLocation}></Chip>
    </LeftMargin>
  );
}

export default SpotLocation
