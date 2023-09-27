import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { signOut } from '../../../api/auth';
import Cookies from 'js-cookie';
import { listStyle } from './styles/menuStyles';
import MenuListItem from './MenuListItem';

function AuthenticatedMenu() {
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
  return (
    <List sx={listStyle} component='nav' aria-label='mailbox folders'>
      <MenuListItem path={'/'} value={'ログアウト'} onClick={handleLogOutClick}/>
    </List>
  );
}

export default AuthenticatedMenu;
