import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

function ContainerForm({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box sx={{ border: '1px solid lightgrey', padding: '80px', width: 600 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</div>
        </Box>
      </div>
    </Container>
  );
}

export default ContainerForm;
