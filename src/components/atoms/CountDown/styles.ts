import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import vars from 'src/commons/variables/cssVariables.scss';

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        fontSize: `${vars.mh9} !important`,
        fontWeight: `${vars.regular} !important`,
    },
    box: {
        border: `1px solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: vars.micro,
        textAlign: 'center',
        maxWidth: '100px',
        padding: `${vars.sh9} ${vars.mh10}`,
    },
}));

export default useStyles;
