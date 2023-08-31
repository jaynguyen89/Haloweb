import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import _cloneDeep from 'lodash/cloneDeep';

import english from 'src/translation/resources/english';
import vietnamese from 'src/translation/resources/vietnamese';

const resources = {
    en: english,
    vi: vietnamese,
};

export const languageResourceKeys = Object.keys(resources);

const i18nextOptions: InitOptions = {
    resources,
    fallbackLng: ['en', 'vi'],
    interpolation: {
        escapeValue: false,
    },
    backend: {
        backends: [HttpBackend, LocalStorageBackend],
        backendOptions: [{
            expirationTime: 30 * 24 * 60 * 60 * 1000, // 30 days
        }, {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        }],
    },
};

i18n
    .use(ChainedBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
        i18nextOptions,
        (error) => {
            console.error('Failed to detect user language, default English is used.');
            console.error(error);

            const options = _cloneDeep(i18nextOptions);
            options.lng = 'en';
            options.fallbackLng = undefined;

            i18n
                .use(ChainedBackend)
                .use(initReactI18next)
                .init(options)
                .then();
        },
    )
    .then();

export default i18n;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const changeLanguageErrorHandler = (error: any) => {
    if (!error) return;

    console.error('Failed to set preferred user language, default English is used.');
    console.error('error=' + JSON.stringify(error));

    const options = _cloneDeep(i18nextOptions);
    options.lng = 'en';
    options.fallbackLng = undefined;

    i18n
        .use(ChainedBackend)
        .use(initReactI18next)
        .init(options)
        .then();
};
