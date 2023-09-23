import React from 'react';
import MenuListItem from './MenuListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

function UnAuthenticatedMenu() {
  const listStyle = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
  return (
    <List sx={listStyle} component='nav' aria-label='mailbox folders' style={{ textAlign: 'center' }}>
      <MenuListItem path={'/auth/sign_up'} value={'新規登録'} />
      <Divider />
      <MenuListItem path={'/auth/sign_in'} value={'ログイン'} />
    </List>
  );
}

export default UnAuthenticatedMenu;
