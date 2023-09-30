import React from 'react';
import { List } from '@mui/material';
import { listStyle } from './styles/menuStyles';
import { ListItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import { signOut } from '../../../../api/auth';
import Cookies from 'js-cookie';

function UserAccountMenu() {
  const handleLogOutClick = async () => {
    try {
      const response = await signOut();
      if (response === null) return;
      if (response.status !== 200) return;
      Cookies.remove('_access_token');
      Cookies.remove('_client');
      Cookies.remove('_uid');
    } catch (e) {
      console.log(e);
    }

    window.location.reload();
  };

  const centeredText = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const listItemStyle = {
    ...centeredText,
    '&:hover': {
      // マウスオーバー時のスタイル
      backgroundColor: '#f2f2f2', // 例：背景色を変更する
    },
  };
  return (
    <List sx={listStyle} component='nav' aria-label='mailbox folders'>
      <ListItem sx={listItemStyle} onClick={handleLogOutClick}>
        <LogoutIcon></LogoutIcon>
        <Typography variant='subtitle2' display='block' gutterBottom sx={{ marginBottom: 0 }}>
          ログアウト
        </Typography>
      </ListItem>
    </List>
  );
}

export default UserAccountMenu;
