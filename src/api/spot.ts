import { baseURL, authHeaders, defaultHeaders,Headers } from './client';
import { Image } from '../types/Spot';

interface CreateSpotArgs {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  location: string;
  images: Image[];
  catchableFish: string[];
  fishingTypes: string[];
}
export const createSpot = async ({
  name,
  description,
  latitude,
  longitude,
  location,
  images,
  catchableFish,
  fishingTypes,
}: CreateSpotArgs): Promise<Response> => {
  const url = `${baseURL}/spots`;
  const method = 'POST';
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('str_latitude', latitude);
  formData.append('str_longitude', longitude);
  formData.append('location', location);
  images.forEach((image) => formData.append('images[]', image.file));
  catchableFish.forEach((fish) => formData.append('fish[]', fish));
  fishingTypes.forEach((fishingType) => formData.append('fishing_types[]', fishingType));

  const headers = authHeaders;
  // ヘッダーにContent-Typeは指定しない
  // https://zenn.dev/kariya_mitsuru/articles/25c9aeb27059e7
  const options: RequestInit = {
    method,
    headers,
    body: formData,
  };
  const response = await fetch(url, options);
  return response;
};

export const getSpots = async (): Promise<Response> => {
  const url = `${baseURL}/spots`;
  const method = 'GET';
  const headers: Headers = defaultHeaders;
  const options: RequestInit = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};

export const getSpotShow = async (spotId: string, userId: string): Promise<Response> => {
  const url = `${baseURL}/spots/${spotId}`;
  const method = 'GET';
  const headers: Headers = {
    'Content-Type': 'application/json',
    'Fishare-User-Id': userId,
  };
  const options: RequestInit = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};
