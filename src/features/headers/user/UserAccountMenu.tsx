import React, { useState, useEffect, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import { getCurrentUser } from '../../../api/auth';
import UserProfile from './UserProfile';
import AuthenticatedMenu from './AuthenticatedMenu';
import UnAuthenticatedMenu from './UnAuthenticatedMenu';

function UserAccountMenu() {
  const [isUserAccountMenuOpen, setIsUserAccountMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('ゲスト');
  const [userEmail, setUserEmail] = useState<string>('');
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleAccountNameClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsUserAccountMenuOpen(!isUserAccountMenuOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCurrentUser();
        if (response === null) return;
        if (response.status !== 200) return;
        const data = await response.json();
        console.log(data);
        setIsAuthenticated(data.is_login);
        if (isAuthenticated) {
          const user = data.data;
          setUserName(user.name);
          setUserEmail(user.email);
        }
      } catch (e) {
        console.log('エラー:', e);
      }
    }

    fetchData();

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
      <div onClick={handleAccountNameClick}>
        <UserProfile userName={userName} userEmail={userEmail} />
      </div>
      {isUserAccountMenuOpen ? (
        <ExpandLessIcon onClick={handleAccountNameClick} style={{ cursor: 'pointer' }} />
      ) : (
        <ExpandMoreIcon onClick={handleAccountNameClick} style={{ cursor: 'pointer' }} />
      )}
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
