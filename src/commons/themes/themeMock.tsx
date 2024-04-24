import React from 'react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import colors from 'src/commons/colors';

export const paletteMock = {
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
};

export const MockTheme = ({ children }: { children: React.ReactElement }) => {
    const themeMock = createTheme({
        mixins: {
            toolbar: { width: '100%' },
            shadowLight: '0 3px 6px rgba(255,255,255,0.16), 0 3px 6px rgba(255,255,255,0.23)',
            shadowDark: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            shadowLightUp: '0 -3px 6px rgba(255,255,255,0.2)',
            shadowDarkUp: '0px -3px 6px rgba(0, 0, 0, 0.2)',
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 667,
                md: 992,
                lg: 1280,
                xl: 1536,
            },
        },
        palette: paletteMock,
    });

    return <ThemeProvider theme={themeMock}>{children}</ThemeProvider>;
}

export const renderWithTheme = (component: React.ReactElement) => render(
    <MockTheme>{component}</MockTheme>
);

export const shallowWithTheme = (component: React.ReactElement) => shallow(
    <MockTheme>{component}</MockTheme>
);

export const mountWithTheme = (component: React.ReactElement) => mount(
    <MockTheme>{component}</MockTheme>
);
