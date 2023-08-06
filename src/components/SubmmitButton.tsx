import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function SubmmitButton({ isLoading, buttonText }: { isLoading: boolean; buttonText: string }) {
  return (
    <Button type='submit' variant='contained'>
      {isLoading ? <CircularProgress color='inherit' /> : `${buttonText}`}
    </Button>
  );
}

export default SubmmitButton
