const baseURL = process.env.REACT_APP_BASE_URL;
type Headers = {
  [key: string]: string;
};
const defaultHeaders = {
  'Content-Type': 'application/json',
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
  return response
};
