import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';

function SignUpSuccessPage() {
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ border: '1px solid lightgrey', padding: '80px', width: 600 }}>
          <Typography variant='h6' gutterBottom>
            ユーザー認証用のメールを送信しました。
            <br />
            メールを確認してください。
          </Typography>
        </Box>
      </div>
    </Container>
  );
}

export default SignUpSuccessPage;
