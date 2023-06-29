import { createTheme, Shadows } from '@mui/material';
import _cloneDeep from 'lodash/cloneDeep';
import { DEFAULT_THEME_SHADOWS } from '../constants';
import colors from '../colors';

const shadows = _cloneDeep(DEFAULT_THEME_SHADOWS);
shadows[0] = `0 3px 6px rgba(0,0,0,0.16)`;
shadows[1] = `0 3px 6px rgba(0,0,0,0.23)`;

export const ThemeSky = createTheme({
    palette: {
        text: {
            primary: colors.white,
            secondary: colors.lightGrey,
            disabled: colors.darkGrey,
        },
        primary: {
            main: colors.lightBlack,
            light: colors.darkerGrey,
            dark: colors.black,
            contrastText: colors.lightBlack,
        },
        secondary: {
            main: colors.darkerTeal,
            light: colors.lighterTeal,
            dark: colors.deepTeal,
            contrastText: colors.teal,
        },
        error: {
            main: colors.darkerRed,
            light: colors.lighterRed,
            dark: colors.deepRed,
            contrastText: colors.red,
        },
        warning: {
            main: colors.darkerYellow,
            light: colors.lighterYellow,
            dark: colors.deepYellow,
            contrastText: colors.yellow,
        },
        info: {
            main: colors.darkerBlue,
            light: colors.lighterBlue,
            dark: colors.deepBlue,
            contrastText: colors.blue,
        },
        success: {
            main: colors.darkerGreen,
            light: colors.lighterGreen,
            dark: colors.deepGreen,
            contrastText: colors.green,
        },
    },
    shadows: shadows as Shadows,
});
