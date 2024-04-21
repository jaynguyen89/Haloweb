import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ITranslation } from 'src/commons/interfaces';
import { I18nextProvider } from 'react-i18next';
import React from 'react';

const translation: ITranslation = {
    translation: {
        'message-caption-test': {
            'error-message': 'This is {{what}} message.',
            'info-message': 'This is an info message.',
            'success-message': 'This is a success message.',
            'warning-message': 'This is an warning message.',
            'error-status-1': 'This is an error status 1.',
            'error-status-2': 'This is an error status 2.',
            'info-status-1': 'This is {{what}} status 1.',
            'info-status-2': 'This is an info status 2.',
            'success-status-1': 'This is a success status 1.',
            'success-status-2': 'This is a success status 2.',
            'warning-status-1': 'This is {{what}} status 1.',
            'warning-status-2': 'This is a warning status 2.',
        },
        footer: {
            'language-select': {
                en: 'English',
                vi: 'Vietnamese',
                ha: 'Halogeno',
            },
        },
    },
};

const options: InitOptions = {
    resources: { en: translation },
    fallbackLng: ['en'],
    interpolation: { escapeValue: false },
};

i18n.use(initReactI18next).init(options).then();

export const withI18nMock = (component: React.ReactElement) => {
    return (
        <I18nextProvider i18n={i18n}>
            {component}
        </I18nextProvider>
    );
};
