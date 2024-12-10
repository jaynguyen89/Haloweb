import vars from 'src/commons/variables/cssVariables.scss';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
