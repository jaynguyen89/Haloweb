import { alpha, InputBase, MenuProps, TypographyProps } from '@mui/material';
import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const XsSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    width: '100%',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.primary.dark,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
        },
        [theme.breakpoints.down('md')]: {
            width: '30ch',
        },
    },
}));

export const NavDropdown = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 4,
        marginTop: theme.spacing(1),
        minWidth: 150,
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export const MenuText = styled(({children, ...props}: TypographyProps) => (
    <Typography {...props}>{children}</Typography>
))(({ theme: Theme }) => ({
   width: '100%',
}));
