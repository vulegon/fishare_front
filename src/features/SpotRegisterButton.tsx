import React from 'react';
import RegisterButton from '../components/RegisterButton';
import { Link } from 'react-router-dom';

function SpotRegisterButton({ isDisabled }: { isDisabled: boolean }) {
  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    display: 'block',
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Link to='/spots' style={linkStyle} onClick={handleLinkClick}>
        <RegisterButton isDisabled={isDisabled} />
      </Link>
    </div>
  );
} 

export default SpotRegisterButton;
