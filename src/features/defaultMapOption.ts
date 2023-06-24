import { Position } from '../types/types';

export const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

interface MapOptions {
  zoom: number;
  center: Position;
  fullscreenControl: boolean;
}

export const mapOptions: MapOptions = {
  zoom: 15,
  center: { lat: 36.063053704526226, lng: 136.22288055523217 },
  fullscreenControl: false,
};
