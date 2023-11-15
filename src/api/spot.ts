import { baseURL, authHeaders, defaultHeaders, Headers } from './client';
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

// 釣り場の作成
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

// 釣り場一覧の取得
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

// 釣り場の詳細画面の表示
export const getSpotShow = async (spotId: string): Promise<Response> => {
  const url = `${baseURL}/spots/${spotId}`;
  const method = 'GET';
  const headers: Headers = authHeaders;
  const options: RequestInit = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};

// 釣り場の検索
export const spotSearch = async ({
  spotName,
  catchableFish,
  locations,
  fishingTypes,
  travelDistances,
  latitude,
  longitude,
}: {
  spotName: string;
  catchableFish?: string[];
  locations?: string[];
  fishingTypes?: string[];
  travelDistances?: string[];
  latitude?: string;
  longitude?: string;
}): Promise<Response> => {
  const url = `${baseURL}/spots/search?`;

  // クエリパラメータをまとめてエンコード
  const queryParams = new URLSearchParams();

  if (spotName) {
    queryParams.append('name', spotName);
  }

  if (catchableFish && catchableFish.length > 0) {
    queryParams.append('catchable_fish', catchableFish.join(','));
  }

  if (locations && locations.length > 0) {
    queryParams.append('locations', locations.join(','));
  }

  if (fishingTypes && fishingTypes.length > 0) {
    queryParams.append('fishing_types', fishingTypes.join(','));
  }

  if (travelDistances && travelDistances.length > 0) {
    queryParams.append('travel_distances', travelDistances.join(','));
    queryParams.append('latitude', String(latitude));
    queryParams.append('longitude', String(longitude));
  }

  const headers: Headers = defaultHeaders;
  const method = 'GET';
  const options = {
    method,
    headers,
  };
  // URLにクエリ文字列を追加
  const finalURL = `${url}${queryParams.toString()}`;
  const response = await fetch(finalURL, options);
  return response;
};

export const deleteSpot = async (spotId: string): Promise<Response> => {
  const url = `${baseURL}/spots/${spotId}`;
  const method = 'DELETE';
  const headers: Headers = authHeaders;
  const options: RequestInit = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};
