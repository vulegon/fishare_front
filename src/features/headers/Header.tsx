import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SearchSpot from './searchSpot/SearchSpot';
import { Box } from '@mui/material';
import UserAccountMenu from './user/UserAccountMenu';

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
          <Typography variant='h6' component='div'>
            Fishare
          </Typography>
        </Link>
        <Box sx={{ width: 100 }}/>
        <SearchSpot/>
        <UserAccountMenu/>
      </Toolbar>
    </AppBar>
  );
}
