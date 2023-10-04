import { baseURL } from './client';
import { Image } from '../types/Spot';

interface CreateSpotArgs {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  location: string;
  images: Image[];
  catchableFish: string[];
}
export const createSpot = async ({
  name,
  description,
  latitude,
  longitude,
  location,
  images,
  catchableFish,
}: CreateSpotArgs): Promise<Response> => {
  const url = `${baseURL}/spots`;
  const method = 'POST';
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  formData.append('location', location);
  images.forEach((image) => formData.append('images[]', image.file));
  catchableFish.forEach((fish) => formData.append('fish[]', fish));

  // ヘッダーは指定しない
  // https://zenn.dev/kariya_mitsuru/articles/25c9aeb27059e7
  const options: RequestInit = {
    method,
    body: formData,
  };
  const response = await fetch(url, options);
  return response;
};
