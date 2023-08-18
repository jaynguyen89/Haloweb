import produce from 'immer';
import { AnyAction } from 'redux';
import * as languageConstants from 'src/redux/constants/languageConstants';

export interface ILanguageStore {
    siteLanguage: {
        selected?: string,
        detected: string,
    },
}

const initialState: ILanguageStore = {
    siteLanguage: {
        detected: 'en',
    },
};

const reducer = produce((state: ILanguageStore, action: AnyAction) => {
    switch (action.type) {
        case languageConstants.PREFETCH_LANGUAGE_ON_LAUNCH:
            state.siteLanguage = action.payload;
            return;
        case languageConstants.CHANGE_SITE_LANGUAGE:
            state.siteLanguage.selected = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
