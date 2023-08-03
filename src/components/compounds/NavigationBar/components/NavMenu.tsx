import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent } from 'react';
import { navMenuSx } from 'src/components/compounds/NavigationBar/styles';

const pages = ['Products', 'Pricing', 'Blog'];

/* eslint-disable  @typescript-eslint/no-explicit-any */
const NavMenu: FunctionComponent<{
    variant?: 'mobile' | 'desktop',
    anchor: null | HTMLElement,
    openMenu: (event: React.MouseEvent<HTMLElement>) => void,
    closeMenu: () => void,
}> = ({
    variant = 'desktop',
    anchor,
    openMenu,
    closeMenu,
}) => {
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
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={openMenu}
                            color='inherit'
                        >
                            <MenuIcon color={'primary.dark' as any} />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchor)}
                            onClose={closeMenu}
                            sx={navMenuSx}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={closeMenu}>
                                    <Typography textAlign='center'>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )) || (
                    <>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={closeMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </>
                )
            }

        </Box>
    );
};

export default NavMenu;
