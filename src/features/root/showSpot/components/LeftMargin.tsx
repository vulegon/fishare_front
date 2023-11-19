import React, { ReactNode } from 'react';

function LeftMargin({ children }: { children: ReactNode }) {
  return <div style={{ marginLeft: '10px' }}>{children}</div>;
}

export default LeftMargin;
