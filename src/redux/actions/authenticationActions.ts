import { Dispatch } from 'redux';
import { Theme } from '@mui/material';
import { StorageKeys } from '../../models/enums/account';
import IAuthenticatedUser from '../../models/AuthenticatedUser';
import * as authenticationConstants from '../constants/authenticationConstants';
import * as themeConstants from '../constants/themeConstants';
import themes from '../../commons/themes';

export const prefetchAccountDataOnLaunch = () => {
    const storedAuthUser = localStorage.getItem(StorageKeys.AUTH_USER);
    const authUser = storedAuthUser ? JSON.parse(storedAuthUser) as IAuthenticatedUser : undefined;

    return (dispatch: Dispatch) => dispatch({
        type: authUser
            ? authenticationConstants.INITIALIZE_AUTH_ON_LAUNCH
            : authenticationConstants.AUTHENTICATION_VOID,
        payload: authUser,
    });
};

export const prefetchDefaultTheme = () => {
    const storedTheme = localStorage.getItem(StorageKeys.DEFAULT_THEME);
    const defaultTheme = storedTheme ? JSON.parse(storedTheme) as Theme : themes.ThemeDay;

    return (dispatch: Dispatch) => dispatch({
        type: themeConstants.LOAD_DEFAULT_THEME,
        payload: defaultTheme,
    });
};
