import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AnyAction } from 'redux';
import App from 'src/foundation/App';
import store from 'src/foundation/store';
import { prefetchAccountDataOnLaunch } from 'src/redux/actions/authenticationActions';
import { prefetchDefaultTheme } from './redux/actions/themeActions';

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
