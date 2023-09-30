import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchSpot from './searchSpot/SearchSpot';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AuthenticatedMenu from './menu/authenticatedMenu/AuthenticatedMenu';
import { CurrentUserContext } from '../../App';
import { getCurrentUser } from '../../api/user';
import UnAuthenticatedMenu from './menu/unAuthenticatedMenu/UnAuthenticatedMenu';

export default function Header({
  isShowSearchSpot = true,
  isShowUserAccountMenu = true,
}: {
  isShowSearchSpot?: boolean;
  isShowUserAccountMenu?: boolean;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response === null) return;
      if (response.status !== 200) return;
      const data = await response.json();
      console.log(data);
      setIsAuthenticated(data.is_login);
      if (isAuthenticated) {
        const userData = data.data;
        const currentUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        };
        setCurrentUser(currentUser);
      }
    } catch (e) {
      console.log('エラー:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
          <Typography variant='h6' component='div'>
            Fishare
          </Typography>
        </Link>
        <Box sx={{ width: 100 }} />
        {isShowSearchSpot && <SearchSpot />}
        {!isLoading && (isShowUserAccountMenu && isAuthenticated ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />)}
      </Toolbar>
    </AppBar>
  );
}
