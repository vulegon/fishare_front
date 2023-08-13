import React from 'react';
import RegisterButton from '../components/RegisterButton';
import { Link } from 'react-router-dom';
import { MarkerPosition } from '../types/types';

interface SpotRegisterButtonProps {
  isDisabled: boolean;
  markerPosition: MarkerPosition;
}

function SpotRegisterButton({ isDisabled, markerPosition }: SpotRegisterButtonProps) {
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
      <Link to={`/spots?lat=${markerPosition.lat}&lng=${markerPosition.lng}`} style={linkStyle} onClick={handleLinkClick}>
        <RegisterButton isDisabled={isDisabled} />
      </Link>
    </div>
  );
} 

export default SpotRegisterButton;
