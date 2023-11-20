export interface ShowSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  fish: string[];
  fishing_types: string[];
  images: string[];
  location: string;
  editable: boolean;
}
