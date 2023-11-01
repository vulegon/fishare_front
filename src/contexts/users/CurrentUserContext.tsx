import React, { createContext } from 'react';
import { CurrentUser } from '../../types/CurrentUser';

export const CurrentUserContext = createContext(
  {} as {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  }
);
