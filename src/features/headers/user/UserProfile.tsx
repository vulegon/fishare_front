import React from 'react';
import Typography from '@mui/material/Typography';

function UserProfile({ userName, userEmail }: { userName: string; userEmail: string }) {
  return (
    <>
      <Typography
        variant='caption'
        component='div'
        style={{ textAlign: 'right', paddingRight: '8px', fontSize: '12px', fontWeight: 'bold' }}
      >
        {userName}
      </Typography>
      <Typography variant='caption' component='div' style={{ textAlign: 'right', paddingRight: '8px' }}>
        {userEmail}
      </Typography>
    </>
  );
}

export default UserProfile;
