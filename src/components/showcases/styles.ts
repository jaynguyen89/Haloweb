import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import vars from 'src/commons/variables/cssVariables.scss';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        margin: `${vars.large} 0`,
        padding: 0,
        '& span': {
            fontWeight: vars.thick,
            fontSize: vars.sh8,
        },
    },
    code: {
        fontSize: vars.sh9,
        fontWeight: vars.light,
        backgroundColor: theme.palette.primary.main,
        padding: `${vars.xh10} ${vars.mh10}`,
        marginTop: vars.h10,
    },
}));

export default useStyles;
