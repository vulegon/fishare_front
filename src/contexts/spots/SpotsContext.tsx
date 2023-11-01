import React, { createContext } from 'react';
import { Spot } from '../../types/Spot';

export const SpotsContext = createContext(
  {} as {
    spots: Spot[];
    setSpots: React.Dispatch<React.SetStateAction<Spot[]>>;
  }
);
