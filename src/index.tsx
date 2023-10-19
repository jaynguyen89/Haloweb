import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import App from 'src/foundation/App';
import store from 'src/foundation/store';
import { prefetchAccountDataOnLaunch } from 'src/redux/actions/authenticationActions';
import { prefetchPublicDataOnLaunch } from 'src/redux/actions/publicDataActions';
import { defaultCookieSetOptions } from 'src/utilities/cookies-helpers/constants';
import { prefetchDefaultTheme } from './redux/actions/themeActions';
import { surrogate } from 'src/utilities/otherUtilities';

import i18next from 'src/translation/i18next';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

surrogate(store.dispatch, prefetchAccountDataOnLaunch());
surrogate(store.dispatch, prefetchDefaultTheme());
surrogate(store.dispatch, prefetchPublicDataOnLaunch());

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
