import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const footerSx: SxProps<Theme> = {
    minHeight: vars.xxmedium,
    width: '100%',
    bottom: 0,
    overflow: 'hidden',
    mt: vars.medium,
    pt: vars.xtiny,
    pb: vars.xtiny,
};

const useStyles = makeStyles((theme: Theme) => ({
    brand: {
        fontFamily: 'monospace',
        fontWeight: 900,
        letterSpacing: '.25rem',
        textTransform: 'uppercase',
    },
}));

export default useStyles;
