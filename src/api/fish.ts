import { baseURL, Headers, defaultHeaders } from './client';

export const getFish = async (): Promise<Response> => {
  const url = `${baseURL}/fish`;
  const method = 'GET';
  const headers: Headers = defaultHeaders;

  const options = {
    method,
    headers,
  };
  const response = await fetch(url, options);
  return response;
};
