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
}));

export default useStyles;
