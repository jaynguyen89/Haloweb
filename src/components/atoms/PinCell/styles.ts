import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const pinWrapperSx: SxProps<Theme> = {
    maxWidth: {
        xs: '19rem',
        sm: '30rem',
        md: '45rem',
    },
    margin: `0 auto ${vars.xxsmall}`,
    alignItems: 'center',
    textAlign: 'center',
};

const useStyles = makeStyles((theme: Theme) => ({
    cell: {
        width: vars.xxsmall,
        height: vars.xmedium,
        margin: `0 ${vars.xmicro}`,
        padding: `${vars.micro}`,
        textAlign: 'center',
        lineHeight: vars.xmedium,
        fontSize: vars.xsmall,
        border: `2px solid ${theme.palette.primary.dark}`,
        borderRadius: vars.micro,
        color: theme.palette.primary.contrastText,
        appearance: 'textfield',
        '-webkit-appearance': 'textfield',
    },
}));

export default useStyles;
