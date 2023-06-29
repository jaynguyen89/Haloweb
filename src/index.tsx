import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import App from './foundation/App';
import store from './foundation/store';
import themes from './commons/themes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={themes.ThemeDay}>
            <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
