import vars from 'src/commons/variables/cssVariables.scss';

export const DEFAULT_THEME_SHADOWS = [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
];

export const themeBreakpoints = {
    xs: +vars.none.slice(0, 1), // 0px
    sm: +vars.mediumWidth.slice(0, -2), // 667px
    md: +vars.desktopWidth.slice(0, -2), // 992px
    lg: +vars.wideWidth.slice(0, -2), // 1280px
    xl: +vars.ultrawideWidth.slice(0, -2), // 1536px
};

export const debounceWait = 1500; // milliseconds
