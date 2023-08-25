import { Theme, useTheme } from '@mui/material';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { IMixins } from 'src/commons/interfaces';
import LogoAndBrand from 'src/components/compounds/NavigationBar/components/LogoAndBrand';
import NavMenu from 'src/components/compounds/NavigationBar/components/NavMenu';
import SearchBox from 'src/components/compounds/NavigationBar/components/SearchBox';
import UserMenu from 'src/components/compounds/NavigationBar/components/UserMenu';
import { xsToolbarSx } from 'src/components/compounds/NavigationBar/styles';

const NavigationBar = () => {
    const [navMenuAnchor, setNavMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchor, setSubMenuAnchor] = React.useState<null | HTMLElement>(null);
    const theme: Theme = useTheme();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNavMenuAnchor(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleOpenSubMenu = (event: React.MouseEvent<HTMLElement>) => {
        setSubMenuAnchor(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setNavMenuAnchor(null);
    };

    const handleCloseUserMenu = () => {
        setUserMenuAnchor(null);
    };

    const handleCloseSubMenu = () => {
        setSubMenuAnchor(null);
    };

    return (
        <>
        <AppBar position='sticky'
                style={{
                    boxShadow: (theme.mixins as IMixins).shadowDark,
                }}
                ref={node => {
                    node?.style?.setProperty('background-color', theme.palette.primary.main, 'important');
                    node?.style?.setProperty('color', theme.palette.primary.contrastText, 'important');
                }}
        >
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <LogoAndBrand />

                    <NavMenu
                        variant='mobile'
                        mainMenuAnchor={navMenuAnchor}
                        subMenuAnchor={subMenuAnchor}
                        openMainMenu={handleOpenNavMenu}
                        closeMainMenu={handleCloseNavMenu}
                        openSubMenu={handleOpenSubMenu}
                        closeSubMenu={handleCloseSubMenu}
                    />

                    <LogoAndBrand variant='mobile' />

                    <SearchBox />

                    <NavMenu
                        mainMenuAnchor={navMenuAnchor}
                        subMenuAnchor={subMenuAnchor}
                        openMainMenu={handleOpenNavMenu}
                        closeMainMenu={handleCloseNavMenu}
                        openSubMenu={handleOpenSubMenu}
                        closeSubMenu={handleCloseSubMenu}
                    />

                    <UserMenu
                        userMenuAnchor={userMenuAnchor}
                        subMenuAnchor={subMenuAnchor}
                        openUserMenu={handleOpenUserMenu}
                        closeUserMenu={handleCloseUserMenu}
                        openSubMenu={handleOpenSubMenu}
                        closeSubMenu={handleCloseSubMenu}
                    />
                </Toolbar>
                <Toolbar sx={xsToolbarSx}>
                    <SearchBox variant='mobile' />
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
};

export default NavigationBar;
