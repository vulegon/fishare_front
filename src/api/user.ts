import { baseURL } from './client';
import Cookies from 'js-cookie';

// ログインユーザーの取得
export const getCurrentUser = async (): Promise<Response | null> => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) {
    console.log('ログインされていません');
    return null;
  }
  const url = `${baseURL}/users`;
  const method = 'GET';
  const headers = {
    'access-token': Cookies.get('_access_token') as string,
    client: Cookies.get('_client') as string,
    uid: Cookies.get('_uid') as string,
  };
  const options = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};
