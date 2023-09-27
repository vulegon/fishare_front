import React, { useState, useEffect, useRef, useContext } from 'react';
import Paper from '@mui/material/Paper';
import { getCurrentUser } from '../../../api/user';
import UserProfile from './UserProfile';
import AuthenticatedMenu from './AuthenticatedMenu';
import UnAuthenticatedMenu from './UnAuthenticatedMenu';
import { CurrentUserContext } from '../../../App';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserAccountMenu() {
  const [isUserAccountMenuOpen, setIsUserAccountMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleAccountNameClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsUserAccountMenuOpen(!isUserAccountMenuOpen);
  };

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
    }
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

  useEffect(() => {
    fetchCurrentUser();
  }, [isAuthenticated]);

  return (
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
      <div onClick={handleAccountNameClick}>
        <UserProfile userName={currentUser.name} userEmail={currentUser.email} />
        <AccountCircleIcon fontSize='large'></AccountCircleIcon>
      </div>
      {isUserAccountMenuOpen && (
        <Paper
          elevation={3}
          style={{
            margin: '10px',
            padding: '10px',
            position: 'absolute',
            top: '35px',
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
          {isAuthenticated ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}
        </Paper>
      )}
    </div>
  );
}

export default UserAccountMenu;
