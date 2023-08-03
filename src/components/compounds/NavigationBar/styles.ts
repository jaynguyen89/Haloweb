import { SxProps, Theme } from '@mui/material';
import { IMixins } from 'src/commons/interfaces';

export const brandSx: SxProps<Theme> = {
    mr: 2,
    fontFamily: 'monospace',
    fontWeight: 900,
    letterSpacing: '.25rem',
    color: 'inherit',
    textDecoration: 'none',
    textTransform: 'uppercase',
};

export const navMenuSx: SxProps<Theme> = {
    display: { xs: 'block', md: 'none' },
    '& .MuiMenu-paper': (theme: Theme) => ({
        backgroundColor: `${theme.palette.primary.light} !important;`,
        color: `${theme.palette.primary.contrastText} !important;`,
        boxShadow: (theme.mixins as IMixins).shadowDark,
    }),
};

export const userMenuSx: SxProps<Theme> = {
    mt: '45px',
    '& .MuiMenu-paper': (theme: Theme) => ({
        backgroundColor: `${theme.palette.primary.light} !important;`,
        color: `${theme.palette.primary.contrastText} !important;`,
        boxShadow: (theme.mixins as IMixins).shadowDark,
    }),
};

export const xsToolbarSx: SxProps<Theme> = {
    display: {
        xs: 'block',
        sm: 'none',
    },
    mt: '10px',
};
