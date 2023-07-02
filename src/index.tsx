import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AnyAction } from 'redux';
import App from './foundation/App';
import store from './foundation/store';
import { prefetchAccountDataOnLaunch, prefetchDefaultTheme } from './redux/actions/authenticationActions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(prefetchAccountDataOnLaunch() as unknown as AnyAction);
store.dispatch(prefetchDefaultTheme() as unknown as AnyAction);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
);
