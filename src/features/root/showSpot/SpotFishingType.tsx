import React from 'react';
import { Typography } from '@mui/material';
import LeftMargin from './components/LeftMargin';
import Chip from '@mui/material/Chip';

function SpotFishingType({ fishingTypes }: { fishingTypes: string[] }) {
  return (
    <LeftMargin>
      <Typography variant='subtitle2' gutterBottom sx={{ fontWeight: 600 }}>
        釣りの種類
      </Typography>
      {fishingTypes.map((fishing_type) => (
        <Chip key={fishing_type} color='primary' label={fishing_type}></Chip>
      ))}
    </LeftMargin>
  );
}

export default SpotFishingType;
