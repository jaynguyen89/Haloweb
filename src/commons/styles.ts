import vars from 'src/commons/variables/cssVariables.scss';
import { SxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IMixins } from './interfaces';

export const modalBoxSx: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: vars.tinyWidth,
        sm: vars.smallWidth,
        md: vars.mediumWidth,
    },
    maxHeight: '700px',
    overflowY: 'scroll',
    backgroundColor: (theme) => theme.palette.common.white,
    border: (theme) => `${vars.xmicro} solid ${theme.palette.primary.dark}}`,
    borderRadius: vars.micro,
    boxShadow: (theme) => (theme.mixins as IMixins).shadowDark,
    padding: vars.xtiny,
    '& .modal-wrapper': {
        padding: `${vars.micro} ${vars.tiny}`,
    },
};

const useCommonStyles = makeStyles((theme: Theme) => ({
    noPadding: {
        padding: `${vars.none} !important`,
    },
    table: {
        border: `1px solid ${theme.palette.primary.main}`,
        '& thead': {
            backgroundColor: theme.palette.primary.dark,
            '& tr': {
                '& th': {
                    fontSize: vars.sh9,
                    fontWeight: vars.thick,
                    color: theme.palette.common.white,
                    borderRight: `1px solid ${theme.palette.primary.main}`,
                },
            },
        },
        '& tbody': {
            '& tr:nth-child(even)': {
                backgroundColor: theme.palette.primary.main,
                '& td': {
                    borderRight: `1px solid ${theme.palette.primary.light}`,
                },
            },
            '& tr:nth-child(odd)': {
                '& td': {
                    borderRight: `1px solid ${theme.palette.primary.main}`,
                },
            },
            '& tr:hover': {
                borderLeft: `3px solid ${theme.palette.secondary.light}`,
            },
            '& tr': {
                '& td': {
                    '& button:not(:first-child)': {
                        marginLeft: vars.xxtiny,
                    },
                },
            },
        },
    },
}));

export default useCommonStyles;
