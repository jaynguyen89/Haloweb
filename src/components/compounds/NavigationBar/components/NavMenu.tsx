import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent } from 'react';
import { childMenuSx, navMenuSx, subMenuSx } from 'src/components/compounds/NavigationBar/styles';

const pages = ['Products', 'Pricing', 'Blog'];

/* eslint-disable  @typescript-eslint/no-explicit-any */
const NavMenu: FunctionComponent<{
    variant?: 'mobile' | 'desktop',
    mainMenuAnchor: null | HTMLElement,
    subMenuAnchor: null | HTMLElement,
    openMainMenu: (event: React.MouseEvent<HTMLElement>) => void,
    closeMainMenu: () => void,
    openSubMenu: (event: React.MouseEvent<HTMLElement>) => void,
    closeSubMenu: () => void,
}> = ({
    variant = 'desktop',
    mainMenuAnchor,
    subMenuAnchor,
    openMainMenu,
    closeMainMenu,
    openSubMenu,
    closeSubMenu,
}) => {
    const [childMenuAnchor, setChildMenuAnchor] = React.useState<null | HTMLElement>(null);

    const handleOpenChildMenu = (event: React.MouseEvent<HTMLElement>) => {
        setChildMenuAnchor(event.currentTarget);
    };

    const handleCloseChildMenu = () => {
        setChildMenuAnchor(null);
    };

    return (
        <Box
            sx={{
                display: {
                    xs: variant === 'mobile' ? 'block' : 'none',
                    md: variant === 'mobile' ? 'none' : 'flex',
                },
                flexGrow: variant === 'mobile' ? 0 : 1,
            }}
        >
            {
                (variant === 'mobile' && (
                    <>
                        <IconButton
                            size='large'
                            aria-controls='main-menu-mobile-variant'
                            aria-haspopup='true'
                            onClick={openMainMenu}
                            color='inherit'
                        >
                            <MenuIcon color={'primary.dark' as any} />
                        </IconButton>
                        <Menu
                            id='main-menu-mobile-variant'
                            anchorEl={mainMenuAnchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(mainMenuAnchor)}
                            onClose={closeMainMenu}
                            sx={navMenuSx}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={closeMainMenu}>
                                    <Typography textAlign='center'>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )) || (
                    <>
                        {pages.map((page) => (
                            <>
                                <Button
                                    key={page}
                                    aria-controls={`main-menu-desktop-variant-${page}`}
                                    aria-haspopup='true'
                                    onClick={openSubMenu}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page}
                                </Button>
                                <Menu
                                    id={`main-menu-desktop-variant-${page}`}
                                    anchorEl={subMenuAnchor}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(subMenuAnchor)}
                                    onClose={closeSubMenu}
                                    sx={subMenuSx}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page}>
                                            <Typography
                                                textAlign='center'
                                                aria-controls={`main-menu-desktop-variant-${page}-test1`}
                                                aria-haspopup='true'
                                                onClick={handleOpenChildMenu}
                                            >
                                                {page}
                                            </Typography>
                                            <Menu
                                                id={`main-menu-desktop-variant-${page}-test1`}
                                                anchorEl={childMenuAnchor}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                open={Boolean(childMenuAnchor)}
                                                onClose={handleCloseChildMenu}
                                                sx={childMenuSx}
                                            >
                                                {pages.map((page) => (
                                                    <MenuItem key={page} onClick={handleCloseChildMenu}>
                                                        <Typography textAlign='center'>{page}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ))}
                    </>
                )
            }

        </Box>
    );
};

export default NavMenu;
