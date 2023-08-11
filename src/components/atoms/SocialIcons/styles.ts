import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import vars from 'src/commons/variables/cssVariables.scss';

const useStyles = makeStyles((theme: Theme) => ({
    iconBox: {
        padding: 0,
        margin: 0,
    },
    icon: {
        cursor: 'pointer',
    },
    inlineIcon: {
        cursor: 'pointer',
        '&:not(:first-child)': {
            marginLeft: `${vars.xtiny} !important`,
        },
    },
}));

export default useStyles;
