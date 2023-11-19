import React from 'react'
import { Typography } from '@mui/material';
import LeftMargin from './components/LeftMargin';
import Chip from '@mui/material/Chip';

function SpotCatchableFish({ catchableFish }: { catchableFish: string[] }) {
  return (
    <LeftMargin>
      <Typography variant='subtitle2' gutterBottom sx={{ fontWeight: 600 }}>
        釣れる魚
      </Typography>
      {catchableFish.map((fish_name) => (
        <Chip key={fish_name} color='primary' label={fish_name}></Chip>
      ))}
    </LeftMargin>
  );
}

export default SpotCatchableFish;
