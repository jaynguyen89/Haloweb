import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IMenuItem } from 'src/commons/interfaces';
import FaIcon from 'src/components/atoms/FaIcon';
import { MenuText, NavDropdown } from 'src/components/compounds/NavigationBar/components';
import { menuItemSx, navMenuSx, subMenuSx } from 'src/components/compounds/NavigationBar/styles';
import { authNavMenuItems, guestNavMenuItems } from 'src/components/compounds/NavigationBar/menusData';

const NavMenu: FunctionComponent<{
    variant?: 'mobile' | 'desktop',
}> = ({
    variant = 'desktop',
}) => {
    const [mainMenuAnchor, setMainMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchor, setSubMenuAnchor] = useState<Record<string, null | HTMLElement>>({});
    const authenticated = false;

    const navMenuItems = useMemo(
        () => authenticated ? authNavMenuItems : guestNavMenuItems,
        [authenticated],
    );

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
                    <NavMenuMobile
                        menuItems={navMenuItems}
                        mainMenuAnchor={mainMenuAnchor}
                        setMainMenuAnchor={setMainMenuAnchor}
                        subMenuAnchor={subMenuAnchor}
                        setSubMenuAnchor={setSubMenuAnchor}
                    />
                )) || (
                    <NavMenuDesktop
                        menuItems={navMenuItems}
                        subMenuAnchor={subMenuAnchor}
                        setSubMenuAnchor={setSubMenuAnchor}
                    />
                )
            }
        </Box>
    );
};

export default NavMenu;


type TNavDesktop = {
    menuItems: Array<IMenuItem>,
    subMenuAnchor: Record<string, null | HTMLElement>,
    setSubMenuAnchor: React.Dispatch<Record<string, null | HTMLElement>>,
};

type TNavMobile = TNavDesktop & {
    mainMenuAnchor: null | HTMLElement,
    setMainMenuAnchor: React.Dispatch<null | HTMLElement>,
};

const NavMenuMobile = ({
    menuItems,
    mainMenuAnchor,
    setMainMenuAnchor,
    subMenuAnchor,
    setSubMenuAnchor,
}: TNavMobile) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <IconButton
                size='large'
                aria-controls='main-menu-mobile-variant'
                aria-haspopup='true'
                onClick={(e) => setMainMenuAnchor(e.currentTarget)}
                color='inherit'
            >
                <MenuIcon color={'primary.dark' as 'primary'} />
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
                onClose={() => setMainMenuAnchor(null)}
                sx={navMenuSx}
            >
                {menuItems.map((menuItem) => (
                    <div key={menuItem.title}>
                        <MenuItem
                            aria-controls={`main-menu-mobile-variant-${menuItem.title}`}
                            aria-haspopup={Boolean(menuItem.children)}
                            onClick={(e) => {
                                menuItem.endpoint
                                    ? navigate(menuItem.endpoint)
                                    : setSubMenuAnchor({ [menuItem.title]: e.currentTarget });
                            }}
                        >
                            <Typography>{t(menuItem.title)}</Typography>
                        </MenuItem>

                        {
                            menuItem.children &&
                            <SubMenu
                                mobile
                                menuItem={menuItem}
                                subMenuAnchor={subMenuAnchor}
                                setSubMenuAnchor={setSubMenuAnchor}
                                setMainMenuAnchor={setMainMenuAnchor}
                            />
                        }
                    </div>
                ))}
            </Menu>
        </>
    );
};

const NavMenuDesktop = ({
    menuItems,
    subMenuAnchor,
    setSubMenuAnchor,
}: TNavDesktop) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    return (
        <>
            {menuItems.map((menuItem: IMenuItem) => (
                <div key={menuItem.title}>
                    <Button
                        aria-controls={`main-menu-desktop-variant-${menuItem.title}`}
                        aria-haspopup={Boolean(menuItem.children)}
                        onClick={(e) => {
                            menuItem.endpoint
                                ? navigate(menuItem.endpoint)
                                : setSubMenuAnchor({ [menuItem.title]: e.currentTarget });
                        }}
                        sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        {t(menuItem.title)}
                    </Button>

                    {
                        menuItem.children &&
                        <SubMenu
                            menuItem={menuItem}
                            subMenuAnchor={subMenuAnchor}
                            setSubMenuAnchor={setSubMenuAnchor}
                        />
                    }
                </div>
            ))}
        </>
    );
};

type TSubMenu = {
    mobile?: true,
    isUserMenu?: true,
    menuItem: IMenuItem,
    setMainMenuAnchor?: React.Dispatch<null | HTMLElement>,
} & Omit<TNavDesktop, 'menuItems'>;

export const SubMenu = ({
    mobile,
    isUserMenu,
    menuItem,
    subMenuAnchor,
    setSubMenuAnchor,
    setMainMenuAnchor,
}: TSubMenu) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <NavDropdown
            id={`main-menu-${mobile ? 'mobile' : 'desktop'}-variant-${menuItem.title}`}
            anchorEl={subMenuAnchor[menuItem.title]}
            anchorOrigin={{
                vertical: mobile || isUserMenu ? 'top' : 'bottom',
                horizontal: mobile ? 'right' : 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: isUserMenu ? 'right' : 'left',
            }}
            open={Boolean(subMenuAnchor[menuItem.title])}
            onClose={() => setSubMenuAnchor({})}
            sx={subMenuSx}
        >
            {menuItem.children!.map((subMenuItem) => (
                <MenuItem
                    key={subMenuItem.title}
                    sx={menuItemSx}
                >
                    <MenuText
                        sx={{width: '100%'}}
                        onClick={() => {
                            navigate(subMenuItem.endpoint!);
                            setSubMenuAnchor({});
                            setMainMenuAnchor && setMainMenuAnchor(null);
                        }}
                    >
                        <FaIcon wrapper='i' ic={subMenuItem.icon} />
                        <span style={{marginLeft: '10px'}}>{t(subMenuItem.title)}</span>
                    </MenuText>
                </MenuItem>
            ))}
        </NavDropdown>
    );
};
