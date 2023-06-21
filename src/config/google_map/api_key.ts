interface EnvType{
  REACT_APP_API_KEY: string;
}

const env = process.env as unknown as EnvType;
export const apiKey = env.REACT_APP_API_KEY;
