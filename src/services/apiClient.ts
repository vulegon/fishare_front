const baseURL = process.env.REACT_APP_BASE_URL;
type Headers = {
  [key: string]: string;
};
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// const createRequest = (endpoint: string, method: string, body?: any, argumentHeaders?: { [key: string]: string }) => {
//   const url = `${baseURL}/${endpoint}`;

//   const headers: Headers = argumentHeaders ? argumentHeaders : defaultHeaders;

//   const options: RequestInit = {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   };

//   return fetch(url, options);
// };

// export async function apiClient(
//   endpoint: string,
//   method: string,
//   body?: any,
//   argumentHeaders?: { [key: string]: string }
// ): Promise<Response> {
//   const response = await createRequest(endpoint, method, body, argumentHeaders);
//   return response;
// }

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
