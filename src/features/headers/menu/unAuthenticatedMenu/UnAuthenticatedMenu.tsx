import React from 'react';
import MenuItem from './components/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';

function UnAuthenticatedMenu() {
  const iconStyle = {
    fontSize: '32px',
  };
  return (
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MenuItem icon={<LoginIcon style={iconStyle} />} text='ログイン' path={'/auth/sign_in'}></MenuItem>
        <MenuItem icon={<ExitToAppIcon style={iconStyle} />} text='新規登録' path={'/auth/sign_up'}></MenuItem>
      </div>
    </div>
  );
}

export default UnAuthenticatedMenu;
