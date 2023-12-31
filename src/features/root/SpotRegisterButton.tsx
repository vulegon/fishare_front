import React from 'react';
import RegisterButton from '../../components/RegisterButton';
import { Link } from 'react-router-dom';
import { MarkerPosition } from '../../types/Spot';

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
      <Link
        to={`/spots?latitude=${markerPosition.latitude}&longitude=${markerPosition.longitude}`}
        style={linkStyle}
        onClick={handleLinkClick}
      >
        <RegisterButton isDisabled={isDisabled} />
      </Link>
    </div>
  );
}

export default SpotRegisterButton;
