import { IMixins } from 'src/commons/interfaces';
import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const textSx: SxProps<Theme> = {
    position: 'absolute',
    top: vars.xxlarge,
    marginLeft: vars.xxlarge,
};

const useStyles = makeStyles((theme: Theme) => ({
    homeBg: {
        maxWidth: '100%',
    },
    heading: {
        fontSize: `${vars.h6} !important`,
        fontWeight: '600 !important',
        color: theme.palette.common.white,
        textShadow: (theme.mixins as IMixins).shadowDark,
    },
    description: {
        fontSize: `${vars.h9} !important`,
        fontWeight: '300 !important',
        color: theme.palette.common.white,
        textShadow: (theme.mixins as IMixins).shadowDark,
    },
}));

export default useStyles;
