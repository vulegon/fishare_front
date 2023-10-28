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
