import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function AuthenticatedMenu() {
  const listStyle = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
  const handleLogOutClick = async () => {
    // await handleLogOut();
    window.location.reload();
  };
  return (
    <List sx={listStyle} component='nav' aria-label='mailbox folders'>
      <ListItem onClick={handleLogOutClick}>
        <ListItemText primary='ログアウト' style={{ textAlign: 'center' }} />
      </ListItem>
    </List>
  );
}

export default AuthenticatedMenu;
