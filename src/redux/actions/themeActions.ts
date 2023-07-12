import { Dispatch } from 'redux';
import { Theme } from '@mui/material';
import { StorageKeys } from 'src/models/enums/account';
import themes from 'src/commons/themes';
import * as themeConstants from 'src/redux/constants/themeConstants';

export const prefetchDefaultTheme = () => {
  const storedTheme = localStorage.getItem(StorageKeys.DEFAULT_THEME);
  const defaultTheme = storedTheme ? JSON.parse(storedTheme) as Theme : themes.ThemeDay;

  return (dispatch: Dispatch) => dispatch({
    type: themeConstants.LOAD_DEFAULT_THEME,
    payload: defaultTheme,
  });
};
