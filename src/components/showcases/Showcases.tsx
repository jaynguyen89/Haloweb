import {
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Theme,
    ThemeProvider,
    Typography,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import Page from 'src/components/atoms/Page/Page';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import CustomFormUiShowcase from 'src/components/showcases/components/CustomFormUiShowcase';
import useStyles from 'src/components/showcases/styles';
import Stages from 'src/models/enums/stage';
import { setStage } from 'src/redux/actions/stageActions';
import _isEqual from 'lodash/isEqual';

import { ThemeDay } from 'src/commons/themes/day';
import { ThemeDream } from 'src/commons/themes/dream';
import { ThemeEarth } from 'src/commons/themes/earth';
import { ThemeGrass } from 'src/commons/themes/grass';
import { ThemeNight } from 'src/commons/themes/night';
import { ThemeOcean } from 'src/commons/themes/ocean';
import { ThemeRose } from 'src/commons/themes/rose';
import { ThemeSky } from 'src/commons/themes/sky';
import { ThemeSunflower } from 'src/commons/themes/sunflower';
import { ThemeTangerine } from 'src/commons/themes/tangerine';

const LoadingShowcase = lazy(() => import('src/components/showcases/components/LoadingShowcase'));
const FlasherShowcase = lazy(() => import('src/components/showcases/components/FlasherShowcase'));
const PreviewShowcase = lazy(() => import('src/components/showcases/components/PreviewShowcase'));
const ProgressShowcase = lazy(() => import('src/components/showcases/components/ProgressShowcase'));
const SpinnerShowcase = lazy(() => import('src/components/showcases/components/SpinnerShowcase'));
const ToastShowcase = lazy(() => import('src/components/showcases/components/ToastShowcase'));
const CountryFlagsShowcase = lazy(() => import('src/components/showcases/components/CountryFlagsShowcase'));
const SocialIconsShowcase = lazy(() => import('src/components/showcases/components/SocialIconsShowcase'));

const components = [
    {
        key: 'loading-variants',
        label: 'Status Indicators - Loading variants',
        showcase: <LoadingShowcase />,
    },
    {
        key: 'flasher-variants',
        label: 'Status Indicators - Flashers',
        showcase: <FlasherShowcase />,
    },
    {
        key: 'preview-variants',
        label: 'Status Indicators - Previews',
        showcase: <PreviewShowcase />,
    },
    {
        key: 'progress-variants',
        label: 'Status Indicators - Progress variants',
        showcase: <ProgressShowcase />,
    },
    {
        key: 'spinner-variants',
        label: 'Status Indicators - Spinners',
        showcase: <SpinnerShowcase />,
    },
    {
        key: 'toast-variants',
        label: 'Status Indicators - Toasts',
        showcase: <ToastShowcase />,
    },
    {
        key: 'country-flags',
        label: 'Country Flags',
        showcase: <CountryFlagsShowcase />,
    },
    {
        key: 'social-icons',
        label: 'Social Icons',
        showcase: <SocialIconsShowcase />,
    },
    {
        key: 'custom-form-ui',
        label: 'Form Elements with Icon',
        showcase: <CustomFormUiShowcase />,
    },
];

const themes = [
    {key: 'day', label: 'Day', value: ThemeDay},
    {key: 'night', label: 'Night', value: ThemeNight},
    {key: 'ocean', label: 'Ocean', value: ThemeOcean},
    {key: 'dream', label: 'Dream', value: ThemeDream},
    {key: 'sky', label: 'Sky', value: ThemeSky},
    {key: 'grass', label: 'Grass', value: ThemeGrass},
    {key: 'sunflower', label: 'Sunflower', value: ThemeSunflower},
    {key: 'tangerine', label: 'Tangerine', value: ThemeTangerine},
    {key: 'rose', label: 'Rose', value: ThemeRose},
    {key: 'earth', label: 'Earth', value: ThemeEarth},
];

const Showcases = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [selectedComponent, setSelectedComponent] = useState(components[0].key);
    const [selectedTheme, setSelectedTheme] = useState(useTheme() as Theme);

    const { themeKey, themeName } = useMemo(() => {
        const found = themes.filter(item => _isEqual(item.value, selectedTheme))[0];
        return { themeKey: found.key, themeName: found.label };
    }, [selectedTheme]);

    const { componentName, showcase } = useMemo(() => {
        const found = components.filter(item => item.key === selectedComponent)[0];
        return { componentName: found.label, showcase: found.showcase };
    }, [selectedComponent]);

    useEffect(() => {
        dispatch(setStage({
            name: Stages.HIDE_SITE_HEADER,
            canClear: false,
        }) as unknown as AnyAction);
    });

    const handleSelectTheme = (e: SelectChangeEvent) => {
        const found = themes.filter(item => item.key === e.target.value)[0];
        setSelectedTheme(found.value);
    };

    return (
        <Page>
            <Suspense fallback={<Loading stage={'showcase'} />}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id='component-selector'>Select a component</InputLabel>
                            <Select
                                labelId='component-selector'
                                label='Select a component'
                                value={selectedComponent}
                                onChange={(e: SelectChangeEvent) => setSelectedComponent(e.target.value)}
                            >
                                {components.map((item, i) => (
                                    <MenuItem
                                        key={`${item.key}-${i}`}
                                        value={item.key}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id='component-selector'>Select a theme</InputLabel>
                            <Select
                                labelId='theme-selector'
                                label='Select a theme'
                                value={themeKey}
                                onChange={handleSelectTheme}
                            >
                                {themes.map((item, i) => (
                                    <MenuItem
                                        key={`${item.key}-${i}`}
                                        value={item.key}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <ThemeProvider theme={selectedTheme}>
                    <Page containerClassName={styles.container}>
                        <Typography variant='h6'>
                            Component: <span>{componentName}</span> in theme <span>{themeName}</span>
                        </Typography>

                        {showcase}
                    </Page>
                </ThemeProvider>
            </Suspense>
        </Page>
    );
};

export default Showcases;
