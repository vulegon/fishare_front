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
  lat: number;
  lng: number;
}
