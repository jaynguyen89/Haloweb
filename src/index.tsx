import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { AnyAction } from 'redux';
import App from 'src/foundation/App';
import store from 'src/foundation/store';
import { prefetchAccountDataOnLaunch } from 'src/redux/actions/authenticationActions';
import { prefetchPublicDataOnLaunch } from 'src/redux/actions/publicDataActions';
import { defaultCookieSetOptions } from 'src/utilities/cookies-helpers/constants';
import { prefetchDefaultTheme } from './redux/actions/themeActions';

import i18next from 'src/translation/i18next';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

store.dispatch(prefetchAccountDataOnLaunch() as unknown as AnyAction);
store.dispatch(prefetchDefaultTheme() as unknown as AnyAction);
store.dispatch(prefetchPublicDataOnLaunch() as unknown as AnyAction);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CookiesProvider defaultSetOptions={defaultCookieSetOptions}>
                <I18nextProvider i18n={i18next} defaultNS='translation'>
                    <App />
                </I18nextProvider>
            </CookiesProvider>
        </Provider>
    </React.StrictMode>,
);
