import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { AnyAction } from 'redux';
import App from 'src/foundation/App';
import store from 'src/foundation/store';
import { prefetchAccountDataOnLaunch } from 'src/redux/actions/authenticationActions';
import { prefetchDefaultTheme } from './redux/actions/themeActions';

import i18next from 'src/translation/i18next';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

store.dispatch(prefetchAccountDataOnLaunch() as unknown as AnyAction);
store.dispatch(prefetchDefaultTheme() as unknown as AnyAction);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={i18next} defaultNS='translation'>
                <App />
            </I18nextProvider>
        </Provider>
    </React.StrictMode>,
);
