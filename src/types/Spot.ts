export interface Position {
  lat: number;
  lng: number;
}

export interface MarkerPosition {
  lat: number | undefined;
  lng: number | undefined;
}

export interface Image {
  id: number;
  file: File;
  img: string;
  title: string;
}

export interface Spot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  fish: string[];
  fishing_types: string[];
  images: string[];
  location: string;
}
