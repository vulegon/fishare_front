import React, { createContext } from 'react';
import { Spot } from '../../types/Spot';

export const SpotsDataContext = createContext(
  {} as {
    spotsData: { spots: Spot[]; isLoading: boolean };
    setSpotsData: React.Dispatch<React.SetStateAction<{ spots: Spot[]; isLoading: boolean }>>;
  }
);
