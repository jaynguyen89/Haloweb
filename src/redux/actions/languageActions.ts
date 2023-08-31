import { i18n } from 'i18next';
import { Dispatch } from 'redux';
import { StorageKeys } from 'src/models/enums/account';
import * as languageConstants from 'src/redux/constants/languageConstants';
import { changeLanguageErrorHandler, languageResourceKeys } from 'src/translation/i18next';

export const prefetchLanguageOnLaunch = (i18next: i18n) => {
    const i18DetectedLanguage = i18next.language;
    const languageFromCookie = localStorage.getItem(StorageKeys.DEFAULT_SITE_LANGUAGE);

    if (languageFromCookie)
        i18next
            .changeLanguage(languageFromCookie, changeLanguageErrorHandler)
            .then();

    return (dispatch: Dispatch) => dispatch({
        type: languageConstants.PREFETCH_LANGUAGE_ON_LAUNCH,
        payload: {
            detected: i18DetectedLanguage,
            selected: Boolean(languageFromCookie) ? languageFromCookie : undefined,
        },
    });
};

export const changeSiteLanguage = (
    language: (typeof languageResourceKeys)[number],
    i18next: i18n,
) => {
    localStorage.setItem(StorageKeys.DEFAULT_SITE_LANGUAGE, language);
    i18next
        .changeLanguage(language, changeLanguageErrorHandler)
        .then();

    return (dispatch: Dispatch) => dispatch({
        type: languageConstants.CHANGE_SITE_LANGUAGE,
        payload: language,
    });
};
