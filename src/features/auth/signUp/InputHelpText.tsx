import React from 'react';
import Typography from '@mui/material/Typography';

function HelpText({ value }: { value: string }) {
  return (
    <Typography  variant='caption' gutterBottom style={{ color: 'grey' }}>
      {value}
    </Typography>
  );
}

export default HelpText;
