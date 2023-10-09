import React, { createContext} from 'react'

export const IsCurrentUserLoadingCompleteContext = createContext(
  {} as {
    isCurrentUserLoadingComplete: boolean;
    setIsCurrentUserLoadingComplete: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

