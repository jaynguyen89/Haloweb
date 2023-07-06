import React, { FunctionComponent } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Badge } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { AvatarPlaceholderImg } from 'src/assets/images';
import { userMenuSx } from 'src/components/compounds/NavigationBar/styles';

const guestSettings = ['Sign up', 'Log in'];
const userSettings = ['Profile', 'Account', 'Dashboard', 'Preferences', 'Logout'];

const UserMenu: FunctionComponent<{
    anchor: null | HTMLElement,
    openMenu: (event: React.MouseEvent<HTMLElement>) => void,
    closeMenu: () => void,
}> = ({
    anchor,
    openMenu,
    closeMenu,
}) => {
    const authenticated = false;
    const settings = authenticated ? userSettings : guestSettings;

    return (
        <Box sx={{ flexGrow: 0 }}>
            {
                authenticated && (
                    <>
                        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
                            <Badge badgeContent={4} color='error'>
                                <AccountCircle />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size='large'
                            aria-label='show 17 new notifications'
                            color='inherit'
                        >
                            <Badge badgeContent={17} color='error'>
                                <AccountCircle />
                            </Badge>
                        </IconButton>
                    </>
                )
            }

            <IconButton onClick={openMenu} sx={{ p: 0, ml: '5px' }}>
                <Avatar alt='Remy Sharp' src={AvatarPlaceholderImg} />
            </IconButton>
            <Menu
                sx={userMenuSx}
                id='menu-appbar'
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchor)}
                onClose={closeMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={closeMenu}>
                        <Typography textAlign='left'>{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenu;
