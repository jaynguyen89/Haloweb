import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';

export const pageSx: SxProps<Theme> = {
    width: '100%',
    height: '100%',
    margin: vars.none,
    padding: vars.none,
};

export const containerSx: SxProps<Theme> = {
    mt: vars.medium,
    mb: vars.xxsmall,
    padding: vars.none,
};
