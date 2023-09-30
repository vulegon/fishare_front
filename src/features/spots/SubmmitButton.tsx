import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function SubmmitButton({ isLoading, buttonText }: { isLoading: boolean; buttonText: string }) {
  return (
    <Button
      type='submit'
      variant='contained'
      style={{
        borderRadius: 50,
        width: '80%',
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      {isLoading ? <CircularProgress color='inherit' /> : '送信'}
    </Button>
  );
}

export default SubmmitButton
