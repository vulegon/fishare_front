import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function SubmmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type='submit' variant='contained' sx={{ width: '80px', height: '40px' }}>
      {isLoading ? <CircularProgress color='inherit' /> : '送信'}
    </Button>
  );
}

export default SubmmitButton
