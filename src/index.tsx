import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <html className="h-full bg-gray-100">
      <body className="h-full">
        <App />
      </body>
    </html>
  </React.StrictMode>
);
