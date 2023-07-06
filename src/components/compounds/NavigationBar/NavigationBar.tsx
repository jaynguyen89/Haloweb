import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import LogoAndBrand from 'src/components/compounds/NavigationBar/components/LogoAndBrand';
import NavMenu from 'src/components/compounds/NavigationBar/components/NavMenu';
import SearchBox from 'src/components/compounds/NavigationBar/components/SearchBox';
import UserMenu from 'src/components/compounds/NavigationBar/components/UserMenu';
import { xsToolbarSx } from 'src/components/compounds/NavigationBar/styles';

const NavigationBar = () => {
    const [navMenuAnchor, setNavMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNavMenuAnchor(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setNavMenuAnchor(null);
    };

    const handleCloseUserMenu = () => {
        setUserMenuAnchor(null);
    };

    return (
        <AppBar position='sticky' color='primary'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <LogoAndBrand />

                    <NavMenu
                        variant='mobile'
                        anchor={navMenuAnchor}
                        openMenu={handleOpenNavMenu}
                        closeMenu={handleCloseNavMenu}
                    />

                    <LogoAndBrand variant='mobile' />

                    <SearchBox />

                    <NavMenu
                        anchor={navMenuAnchor}
                        openMenu={handleOpenNavMenu}
                        closeMenu={handleCloseNavMenu}
                    />

                    <UserMenu
                        anchor={userMenuAnchor}
                        openMenu={handleOpenUserMenu}
                        closeMenu={handleCloseUserMenu}
                    />
                </Toolbar>
                <Toolbar sx={xsToolbarSx}>
                    <SearchBox variant='mobile' />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavigationBar;
