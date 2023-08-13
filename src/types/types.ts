export interface Position {
  lat: number;
  lng: number;
}

export interface MarkerPosition {
  lat: number | undefined;
  lng: number | undefined;
}

export interface Image {
    file: File;
    img: string;
    title: string;
    id: number;
  }
