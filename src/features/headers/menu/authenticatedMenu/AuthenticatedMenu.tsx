import React, { useState, useEffect, useRef, useContext } from 'react';
import Paper from '@mui/material/Paper';
import { CurrentUserContext } from '../../../../App';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import UserAccountMenu from './UserAccountMenu';

function AuthenticatedMenu() {
  const [isUserAccountMenuOpen, setIsUserAccountMenuOpen] = useState<boolean>(false);
  const { currentUser } = useContext(CurrentUserContext);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleAccountNameClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsUserAccountMenuOpen(!isUserAccountMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserAccountMenuOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '65px',
          }}
          onClick={handleAccountNameClick}
        >
          <AccountCircleIcon fontSize='large'></AccountCircleIcon>
          <Typography variant='caption' display='block' gutterBottom sx={{ marginBottom: 0 }}>
            {currentUser.name}
          </Typography>
        </div>
        {isUserAccountMenuOpen && (
          <Paper
            elevation={3}
            style={{
              margin: '10px',
              padding: '10px',
              position: 'absolute',
              top: '40px',
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
            <UserAccountMenu></UserAccountMenu>
          </Paper>
        )}
      </div>
    </div>
  );
}

export default AuthenticatedMenu;
