import React, { useState, useEffect, useRef } from 'react';
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
  const [isHeaderAccountMenuOpen, setIsHeaderAccountMenuOpen] = useState<boolean>(false);
  const accountName = useGetLoginUserName();
  const isAuthenticated = useIsLogin();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleAccountNameClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsHeaderAccountMenuOpen(!isHeaderAccountMenuOpen);
  };

  const handleLogOutClick = async () => {
    await handleLogOut();
    window.location.reload();
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    display: 'block',
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsHeaderAccountMenuOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
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
          {isHeaderAccountMenuOpen ? (
            <ExpandLessIcon onClick={handleAccountNameClick} style={{ cursor: 'pointer' }} />
          ) : (
            <ExpandMoreIcon onClick={handleAccountNameClick} style={{ cursor: 'pointer' }} />
          )}
          {isHeaderAccountMenuOpen && (
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
                width: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              ref={menuRef}
            >
              {isAuthenticated ? (
                <List sx={style} component='nav' aria-label='mailbox folders'>
                  <ListItem onClick={handleLogOutClick}>
                    <ListItemText primary='ログアウト' style={{ textAlign: 'center' }} />
                  </ListItem>
                </List>
              ) : (
                <List sx={style} component='nav' aria-label='mailbox folders' style={{ textAlign: 'center' }}>
                  <ListItem sx={centeredText}>
                    <Link to='/users/sign_up' style={linkStyle}>
                      新規登録
                    </Link>
                  </ListItem>
                  <Divider />
                  <ListItem sx={centeredText}>
                    <Link to='/users/sign_in' style={linkStyle}>
                      ログイン
                    </Link>
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
