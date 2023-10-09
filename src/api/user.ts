import { baseURL, authHeaders } from './client';
import Cookies from 'js-cookie';

// ログインユーザーの取得
export const getCurrentUser = async (): Promise<Response | null> => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) {
    console.log('ログインされていません');
    return null;
  }
  const url = `${baseURL}/users`;
  const method = 'GET';
  const headers = authHeaders;
  const options = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};
