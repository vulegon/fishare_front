import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchSpot from './searchSpot/SearchSpot';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AuthenticatedMenu from './menu/authenticatedMenu/AuthenticatedMenu';
import { CurrentUserContext, IsCurrentUserLoadingCompleteContext } from '../../contexts/index';
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
        {isCurrentUserLoadingComplete &&
          (isShowUserAccountMenu && isUserLoggedIn(currentUser) ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />)}
      </Toolbar>
    </AppBar>
  );
}
