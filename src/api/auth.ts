import { baseURL, Headers, defaultHeaders, authHeaders } from './client';
import Cookies from 'js-cookie';

// ユーザー登録
export const signUp = async ({
  name,
  email,
  password,
  password_confirmation,
  confirm_success_url,
}: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  confirm_success_url: string;
}): Promise<Response> => {
  const url = `${baseURL}/auth`;
  const method = 'POST';
  const headers: Headers = defaultHeaders;
  const data = {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
    confirm_success_url: confirm_success_url,
  };
  const options: RequestInit = {
    method,
    headers,
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};

// ログアウト
export const signOut = async (): Promise<Response | null> => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) {
    console.log('ログインされていません');
    return null;
  }
  const url = `${baseURL}/auth/sign_out`;
  const method = 'DELETE';
  const headers = authHeaders;
  const options = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};

// ログイン
export const signIn = async ({ email, password }: { email: string; password: string }): Promise<Response> => {
  const url = `${baseURL}/auth/sign_in`;
  const method = 'POST';
  const headers: Headers = defaultHeaders;
  const data = {
    email: email,
    password: password,
  };
  const options: RequestInit = {
    method,
    headers,
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};
