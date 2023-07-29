import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoadScript } from '@react-google-maps/api';
import { apiKey } from './config/google_map/api_key';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* コンポーネントが呼び出されるたびにLoadScriptが実行されるとエラーになるので、そのための対応 */}
    <LoadScript googleMapsApiKey={apiKey}>
      <App />
    </LoadScript>
  </React.StrictMode>
);
