import { makeStyles } from '@mui/styles';
import { SxProps, Theme } from '@mui/material';
import vars from 'src/commons/variables/cssVariables.scss';

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

const useStyles = makeStyles({
    socialLogins: {
        margin: 0,
        padding: 0,
        width: '100%',
        '& p': {
            fontWeight: vars.thick,
            fontSize: `${vars.h9} !important`,
        },
        '& div.MuiGrid-item': {
            textAlign: 'center',
        },
    },
});

export default useStyles;
