import { IMixins } from 'src/commons/interfaces';
import vars from 'src/commons/variables/cssVariables.scss';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    verticalDrawer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // minWidth: '14rem',
        // maxWidth: '16rem',
        // marginLeft: vars.micro,
        paddingLeft: vars.xxtiny,
        paddingBottom: vars.xxtiny,
        boxShadow: (theme.mixins as IMixins).shadowDark,

        '& h5': {
            marginTop: vars.xtiny,
            marginBottom: vars.micro,
            color: theme.palette.text.secondary,
            fontWeight: vars.thick,
            fontSize: vars.sh9,
        },

        '& .menu-item': {
            marginTop: vars.sh10,
            paddingLeft: vars.xtiny,
            paddingTop: vars.micro,
            paddingBottom: vars.micro,
            lineHeight: vars.xsmall,
            fontSize: vars.sh9,
            borderBottom: `${vars.xmicro} solid ${theme.palette.primary.main}`,

            '& svg': {
                float: 'right',
                marginRight: vars.xxtiny,
                paddingTop: vars.sh10,
            },

            '&:hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.primary.main,
            },
        },

        '& .active': {
            fontWeight: vars.thick,
            color: theme.palette.info.main,
            backgroundColor: theme.palette.info.contrastText,
            borderLeft: `${vars.micro} solid ${theme.palette.info.main}`,
        },

        '& .divider': {
            border: `${vars.xmicro} solid ${theme.palette.text.disabled}`,
            marginTop: vars.xxtiny,
            maxWidth: '12rem',
        },
    },
}));

export default useStyles;
