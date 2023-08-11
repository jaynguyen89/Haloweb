import { IMixins } from 'src/commons/interfaces';
import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const loginBoxSx: SxProps<Theme> = {
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

export const helpBoxSx: SxProps<Theme> = {
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
};

export const loginFormSx: SxProps<Theme> = {
    mb: vars.xxsmall,
};

const useStyles = makeStyles((theme: Theme) => ({
    loginWrapper: {
        margin: `${vars.xh1} auto`,
        padding: 0,
    },
    title: {
        fontSize: `${vars.h8} !important`,
        fontWeight: 'bold !important',
        textAlign: 'center',
        margin: `${vars.tiny} auto ${vars.small} !important`,

    },
    orLabel: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        borderRadius: '50%',
        width: vars.xmedium,
        height: vars.xmedium,
        margin: 'auto',
        textTransform: 'uppercase',
        lineHeight: vars.xmedium,
        fontSize: vars.h9,
        fontWeight: 600,
    },
    flagIcon: {
        position: 'absolute !important' as 'absolute',
        right: vars.xxtiny,
    },
    loginButton: {
        boxShadow: (theme.mixins as IMixins).shadowDark,
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    socialLogins: {
        margin: 0,
        padding: 0,
        width: '100%',
        '& p': {
            fontWeight: 600,
            fontSize: `${vars.h9} !important`,
        },
        '& div.MuiGrid-item': {
            textAlign: 'center',
        },
    },
}));

export default useStyles;
