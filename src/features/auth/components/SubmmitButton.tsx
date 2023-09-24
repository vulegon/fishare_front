import React from 'react';
import { Button } from '@mui/material';

function SubmmitButton({ value }: { value: string }) {
  return (
    <Button type='submit' variant='contained' color='primary' fullWidth>
      {value}
    </Button>
  );
}

export default SubmmitButton;
