import { createTheme, Shadows } from '@mui/material';
import _cloneDeep from 'lodash/cloneDeep';
import { DEFAULT_THEME_SHADOWS, themeBreakpoints } from 'src/commons/constants';
import colors from 'src/commons/colors';
import { IMixins } from 'src/commons/interfaces';

const shadows = _cloneDeep(DEFAULT_THEME_SHADOWS);
shadows[0] = '0 3px 6px rgba(0,0,0,0.16)';
shadows[1] = '0 3px 6px rgba(0,0,0,0.23)';

export const ThemeDay = createTheme({
    mixins: {
        toolbar: { width: '100%' },
        shadowLight: '0 3px 6px rgba(255,255,255,0.16), 0 3px 6px rgba(255,255,255,0.23)',
        shadowDark: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        shadowLightUp: '0 -3px 6px rgba(255,255,255,0.2)',
        shadowDarkUp: '0px -3px 6px rgba(0, 0, 0, 0.2)',
    } as IMixins,
    breakpoints: { values: themeBreakpoints },
    palette: {
        text: {
            primary: colors.lightBlack,
            secondary: colors.darkGrey,
            disabled: colors.grey,
        },
        primary: {
            main: colors.lightGrey,
            light: colors.lighterGrey,
            dark: colors.darkGrey,
            contrastText: colors.darkerGrey,
        },
        secondary: {
            main: colors.darkTeal,
            light: colors.lightTeal,
            dark: colors.deepTeal,
            contrastText: colors.lighterTeal,
        },
        error: {
            main: colors.darkRed,
            light: colors.lightRed,
            dark: colors.deepRed,
            contrastText: colors.lighterRed,
        },
        warning: {
            main: colors.darkYellow,
            light: colors.lightYellow,
            dark: colors.deepYellow,
            contrastText: colors.lighterYellow,
        },
        info: {
            main: colors.darkBlue,
            light: colors.lightBlue,
            dark: colors.deepBlue,
            contrastText: colors.lighterBlue,
        },
        success: {
            main: colors.darkGreen,
            light: colors.lightGreen,
            dark: colors.deepGreen,
            contrastText: colors.lighterGreen,
        },
        common: {
            white: colors.white,
            black: colors.black,
        },
    },
    shadows: shadows as Shadows,
});
