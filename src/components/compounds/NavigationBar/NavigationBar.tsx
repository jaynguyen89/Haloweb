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
    const theme: Theme = useTheme();

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

                    <NavMenu variant='mobile' />

                    <LogoAndBrand variant='mobile' />

                    <SearchBox />

                    <NavMenu />

                    <UserMenu />
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
