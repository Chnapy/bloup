import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

// const root = createRoot(document.querySelector('#root')!);
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.querySelector('#root')
);
