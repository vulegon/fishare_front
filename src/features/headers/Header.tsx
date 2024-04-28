import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchSpot from './searchSpot/SearchSpot';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AuthenticatedMenu from './menu/authenticatedMenu/AuthenticatedMenu';
import { CurrentUserContext, IsCurrentUserLoadingCompleteContext } from '../../contexts/users/index';
import UnAuthenticatedMenu from './menu/unAuthenticatedMenu/UnAuthenticatedMenu';
import { isUserLoggedIn } from '../../utils/authUtils';

export default function Header({
  isShowSearchSpot = true,
  isShowUserAccountMenu = true,
}: {
  isShowSearchSpot?: boolean;
  isShowUserAccountMenu?: boolean;
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { isCurrentUserLoadingComplete } = useContext(IsCurrentUserLoadingCompleteContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' onClick={redirect} style={{ cursor: 'pointer' }}>
          Fishare
        </Typography>
        <Box sx={{ width: 100 }} />
        {isShowSearchSpot && <SearchSpot />}
        {isCurrentUserLoadingComplete &&
          (isShowUserAccountMenu && isUserLoggedIn(currentUser) ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />)}
      </Toolbar>
    </AppBar>
  );
}
