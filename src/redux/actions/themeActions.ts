import { Dispatch } from 'redux';
import themes from 'src/commons/themes';
import * as themeConstants from 'src/redux/constants/themeConstants';
import { surrogate } from 'src/utilities/otherUtilities';
import { StorageKeys } from 'src/commons/enums';

export const prefetchDefaultTheme = () => {
  const storedThemeIndex = localStorage.getItem(StorageKeys.DEFAULT_THEME_INDEX);
  const defaultThemeKey = Object.keys(themes)[storedThemeIndex ? +storedThemeIndex : 0];

  return (dispatch: Dispatch) => surrogate(dispatch, {
    type: themeConstants.LOAD_DEFAULT_THEME,
    payload: themes[defaultThemeKey as keyof typeof themes],
  });
};

export const setDefaultTheme = (index: number) => {
  const themeKey = Object.keys(themes)[index];
  const selectedTheme = themes[themeKey as keyof typeof themes];

  localStorage.setItem(StorageKeys.DEFAULT_THEME_INDEX, `${index}`);
  return (dispatch: Dispatch) => surrogate(dispatch, {
    type: themeConstants.SET_DEFAULT_THEME,
    payload: selectedTheme,
  });
};
