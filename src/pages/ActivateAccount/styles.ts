import { IMixins } from 'src/commons/interfaces';
import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const activateAccountBoxSx: SxProps<Theme> = {
    border: (theme) => `1px solid ${theme.palette.primary.main}`,
    borderRadius: vars.micro,
    pl: vars.xxtiny,
    pr: vars.xxtiny,
    height: '100%',
    minWidth: '14rem',
    maxWidth: {
        xs: '20rem',
        sm: '34rem',
        md: '50rem',
    },
    margin: `0 auto ${vars.small} auto`,
    boxShadow: (theme) => (theme.mixins as IMixins).shadowDark,
};

export const activateAccountFormSx: SxProps<Theme> = {
    mb: vars.xxsmall,
};

const useStyles = makeStyles((theme: Theme) => ({
    activateAccountWrapper: {
        margin: `${vars.xh1} auto`,
        padding: 0,
    },
    title: {
        fontSize: `${vars.h8} !important`,
        fontWeight: `${vars.bold} !important`,
        textAlign: 'center',
        margin: `${vars.tiny} auto ${vars.small} !important`,
    },
    secretCodeCaption: {
        fontSize: `${vars.xh10} !important`,
        lineHeight: `${vars.h9} !important`,
        margin: `0 0 ${vars.small}`,
    },
}));

export default useStyles;
