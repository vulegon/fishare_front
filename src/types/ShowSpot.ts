import { Image } from './Spot';

export interface ShowSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  fish: string[];
  fishing_types: string[];
  images: Image[];
  location: string;
  editable: boolean;
}
