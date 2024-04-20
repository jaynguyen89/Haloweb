import React from 'react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';

export const MockTheme = ({ children }: { children: React.ReactElement }) => {
    const theme = createTheme({});
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
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
