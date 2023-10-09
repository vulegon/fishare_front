import Cookies from 'js-cookie';

export const baseURL = process.env.REACT_APP_BASE_URL;

export type Headers = {
  [key: string]: string;
};

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const authHeaders = {
  'access-token': Cookies.get('_access_token') as string,
  client: Cookies.get('_client') as string,
  uid: Cookies.get('_uid') as string,
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
