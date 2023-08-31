import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { IMixins } from 'src/commons/interfaces';
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
        fontWeight: `${vars.thick} !important`,
        color: theme.palette.common.white,
        textShadow: (theme.mixins as IMixins).shadowDark,
    },
    description: {
        fontSize: `${vars.h9} !important`,
        fontWeight: `${vars.light} !important`,
        color: theme.palette.common.white,
        textShadow: (theme.mixins as IMixins).shadowDark,
    },
}));

export default useStyles;
