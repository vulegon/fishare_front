import { Image } from '../../../types/Spot';
import { Position } from '../../../types/Spot';
export interface SpotData {
  name: string;
  description: string;
  position: Position;
  fish: string[];
  fishingTypes: string[];
  images: Image[];
  location: string;
  isLoading: boolean;
}
