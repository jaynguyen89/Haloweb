import produce from 'immer';
import * as themeConstants from 'src/redux/constants/themeConstants';
import { Theme } from '@mui/material';
import themes from 'src/commons/themes';
import { AnyAction } from 'redux';

export interface IThemeStore {
    defaultTheme: Theme,
}

const initialState: IThemeStore = {
    defaultTheme: themes.ThemeDay,
};

const reducer = produce((state: IThemeStore, action: AnyAction) => {
    switch (action.type) {
        case themeConstants.LOAD_DEFAULT_THEME:
            state.defaultTheme = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
