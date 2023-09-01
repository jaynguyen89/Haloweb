import { SxProps, Theme } from '@mui/material';
import { IMixins } from 'src/commons/interfaces';
import vars from 'src/commons/variables/cssVariables.scss';

export const brandSx: SxProps<Theme> = {
    mr: vars.micro,
    fontFamily: 'monospace',
    fontWeight: vars.bold,
    letterSpacing: vars.micro,
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

export const subMenuSx: SxProps<Theme> = {
    '& .MuiMenu-paper': (theme: Theme) => ({
        backgroundColor: `${theme.palette.primary.light} !important;`,
        color: `${theme.palette.primary.contrastText} !important;`,
        boxShadow: (theme.mixins as IMixins).shadowDark,
    }),
};

export const userMenuSx: SxProps<Theme> = {
    mt: vars.mh5,
    '& .MuiMenu-paper': (theme: Theme) => ({
        backgroundColor: `${theme.palette.primary.light} !important;`,
        color: `${theme.palette.primary.contrastText} !important;`,
        boxShadow: (theme.mixins as IMixins).shadowDark,
    }),
};

export const menuItemSx: SxProps<Theme> = {
    pl: 0,
    pr: 0,
    '& p': {
        pl: 2,
        pr: 2,
    },
};

export const xsToolbarSx: SxProps<Theme> = {
    display: {
        xs: 'block',
        sm: 'none',
    },
    mt: '10px',
};
