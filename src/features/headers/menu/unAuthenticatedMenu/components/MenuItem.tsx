import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'; // react-router-domをインポート

function MenuItem({ icon, text, path }: { icon: React.ReactNode; text: string, path: string }) {
  return (
    <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '65px',
        }}
      >
        {icon}
        {/* Typographyは自動でmarginBottomが入るのでそれを打ち消す */}
        <Typography variant='caption' display='block' gutterBottom sx={{ marginBottom: 0 }}>
          {text}
        </Typography>
      </div>
    </Link>
  );
}

export default MenuItem;
