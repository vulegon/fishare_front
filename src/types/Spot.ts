export interface Position {
  latitude: number;
  longitude: number;
}

export interface MarkerPosition {
  latitude: number | undefined;
  longitude: number | undefined;
}

export interface Image {
  id: string;
  file: File;
  img: string;
  title: string;
}

export interface Spot {
  id: string;
  latitude: number;
  longitude: number;
}
