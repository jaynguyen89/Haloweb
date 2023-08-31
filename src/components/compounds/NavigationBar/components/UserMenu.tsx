import React, { useState } from 'react';
import { Badge, Theme, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { AvatarPlaceholderImg } from 'src/assets/images';
import { IMenuItem } from 'src/commons/interfaces';
import FaIcon from 'src/components/atoms/FaIcon';
import { SubMenu } from 'src/components/compounds/NavigationBar/components/NavMenu';
import { userMenuItems } from 'src/components/compounds/NavigationBar/menusData';
import { userMenuSx } from 'src/components/compounds/NavigationBar/styles';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme: Theme = useTheme();

    const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchor, setSubMenuAnchor] = useState<Record<string, null | HTMLElement>>({});

    const authenticated = false;

    return (
        <Box sx={{ flexGrow: 0 }}>
            {authenticated && (
                <>
                    <IconButton
                        size='large'
                        aria-label='show 4 new mails'
                        color='inherit'
                    >
                        <Badge badgeContent={4} color='error'>
                            <FaIcon wrapper='i' ic='envelope' />
                        </Badge>
                    </IconButton>

                    <IconButton
                        size='large'
                        aria-label='show 17 new notifications'
                        color='inherit'
                    >
                        <Badge badgeContent={17} color='error'>
                            <FaIcon wrapper='i' ic='bell' />
                        </Badge>
                    </IconButton>
                </>
            )}

            <IconButton
                aria-controls='user-menu-dropdown'
                aria-haspopup={authenticated}
                onClick={(e) => {
                    if (authenticated) setUserMenuAnchor(e.currentTarget);
                    else navigate('/login');
                }}
                sx={{ p: 0, ml: '5px' }}
            >
                <Avatar alt='Remy Sharp' src={AvatarPlaceholderImg} />
            </IconButton>
            <Menu
                id='user-menu-dropdown'
                anchorEl={userMenuAnchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(userMenuAnchor)}
                onClose={() => setUserMenuAnchor(null)}
                sx={userMenuSx}
            >
                {userMenuItems.map((menuItem: IMenuItem) => (
                    <div key={menuItem.title}>
                        <MenuItem
                            aria-controls={`user-sub-menu-${menuItem.title}`}
                            aria-haspopup={Boolean(menuItem.children)}
                            onClick={(e) => {
                                menuItem.endpoint
                                    ? navigate(menuItem.endpoint)
                                    : setSubMenuAnchor({ [menuItem.title]: e.currentTarget });
                            }}
                        >
                            <FaIcon wrapper='i' ic={menuItem.icon} />
                            <span style={{marginLeft: '10px'}}>{t(menuItem.title)}</span>
                        </MenuItem>

                        {
                            menuItem.children &&
                            <SubMenu
                                isUserMenu
                                menuItem={menuItem}
                                subMenuAnchor={subMenuAnchor}
                                setSubMenuAnchor={setSubMenuAnchor}
                                setMainMenuAnchor={setUserMenuAnchor}
                            />
                        }
                    </div>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenu;
