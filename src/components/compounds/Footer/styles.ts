import { IMixins } from 'src/commons/interfaces';
import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const footerSx: SxProps<Theme> = {
    minHeight: vars.xxmedium,
    width: '100%',
    overflow: 'hidden',
    pt: vars.xtiny,
    pb: vars.xtiny,
    backgroundColor: theme => theme.palette.primary.light,
    boxShadow: theme => (theme.mixins as IMixins).shadowDarkUp,
};

const useStyles = makeStyles(() => ({
    brand: {
        fontFamily: 'monospace',
        fontWeight: 900,
        letterSpacing: '.25rem',
        textTransform: 'uppercase',
    },
}));

export default useStyles;
