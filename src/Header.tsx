import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import { useGetLoginUserName, useIsLogin, handleLogOut } from './services/auth';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Header() {
  const [isAccountNameClicked, setIsAccountNameClicked] = useState<boolean>(false);
  const accountName = useGetLoginUserName();
  const isAuthenticated = useIsLogin();
  const handleAccountNameClick = () => {
    setIsAccountNameClicked(!isAccountNameClicked);
  };
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
  const centeredText = {
    display: 'flex',
    alignItems: 'center', // テキストを中央に配置するスタイル
    justifyContent: 'center',
  };
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
          <Typography variant='h6' component='div'>
            Fishare
          </Typography>
        </Link>
        <div
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
        >
          <div onClick={handleAccountNameClick}>
            <Typography variant='subtitle2' component='div'>
              {accountName}
            </Typography>
          </div>
          {isAccountNameClicked ? (
            <ExpandLessIcon onClick={handleAccountNameClick} style={{ cursor: 'pointer' }} />
          ) : (
            <ExpandMoreIcon onClick={handleAccountNameClick} style={{ cursor: 'pointer' }} />
          )}
          {isAccountNameClicked && (
            <Paper
              elevation={3}
              style={{
                margin: '10px',
                padding: '10px',
                position: 'absolute',
                top: '20px',
                right: '0',
                zIndex: 100,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                width: '130px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isAuthenticated ? (
                <List sx={style} component='nav' aria-label='mailbox folders'>
                  <ListItem >
                    <ListItemText primary='Inbox' />
                  </ListItem>
                </List>
              ) : (
                <List sx={style} component='nav' aria-label='mailbox folders'>
                  <ListItem sx={centeredText}>
                    <ListItemText primary='新規登録' />
                  </ListItem>
                  <Divider />
                  <ListItem sx={centeredText}>
                    <ListItemText primary='ログイン' />
                  </ListItem>
                </List>
              )}
            </Paper>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
