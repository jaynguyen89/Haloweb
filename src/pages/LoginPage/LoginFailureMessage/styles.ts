import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import vars from 'src/commons/variables/cssVariables.scss';

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        fontSize: vars.sh9,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.contrastText,
        padding: `${vars.xxtiny} ${vars.xtiny}`,
        '& p': {
            marginTop: vars.none,
            marginBottom: vars.micro,
            '&:last-child': {
                marginBottom: vars.none,
            },
        },
    },
}));

export default useStyles;
