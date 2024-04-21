import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import useStyles, { footerSx } from 'src/components/compounds/Footer/styles';
import { changeSiteLanguage } from 'src/redux/actions/languageActions';
import { setDefaultTheme } from 'src/redux/actions/themeActions';
import { TRootState } from 'src/redux/reducers';
import { languageResourceKeys } from 'src/translation/i18next';
import { surrogate } from 'src/utilities/otherUtilities';

const mapStateToProps = (state: TRootState) => ({
    siteLanguage: state.languageStore.siteLanguage,
    themes: state.publicDataStore.publicData.themes,
});

const Footer = ({
    siteLanguage: {
        selected: selectedLanguage,
        detected: detectedLanguage,
    },
    themes,
}: ReturnType<typeof mapStateToProps>) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const styles = useStyles();
    const [selectedTheme, setSelectedTheme] = useState(0);

    const handleSelectSiteLanguage = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (languageResourceKeys.includes(value)) {
            surrogate(dispatch, changeSiteLanguage(value, i18n));
            return;
        }

        console.error(`Language not supported: ${value}`);
    };

    const handleSelectSiteTheme = (event: SelectChangeEvent) => {
        const themeIndex = +event.target.value;
        setSelectedTheme(themeIndex);
        surrogate(dispatch, setDefaultTheme(themeIndex));
    };

    return (
        <Box sx={{ ...footerSx }}>
            <Container maxWidth='xl'>
                <Grid container spacing={2}>
                    <Grid item md={8} sm={4} xs={12}>
                        <Typography variant='h5' className={styles.brand}>
                            Halo Marketplace
                        </Typography>
                        <Typography variant='body2'>
                            {t('footer.project-intro', {whom: 'Jay Nguyen'})}
                        </Typography>
                    </Grid>
                    <Grid item md={2} sm={4} xs={6} sx={{alignSelf: 'center'}}>
                        <FormControl size='small' fullWidth>
                            <InputLabel id='language-select-label'>
                                {t('footer.language-select.label')}
                            </InputLabel>
                            <Select
                                labelId='language-select-label'
                                label={t('footer.language-select.label')}
                                value={selectedLanguage ?? detectedLanguage}
                                onChange={handleSelectSiteLanguage}
                            >
                                {languageResourceKeys.map((lang, i) => (
                                    <MenuItem key={`${lang}-${i}`} value={lang}>
                                        <Typography variant='subtitle2'>{t(`footer.language-select.${lang}`)}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={2} sm={4} xs={6} sx={{alignSelf: 'center'}}>
                        <FormControl size='small' fullWidth>
                            <InputLabel id='theme-select-label'>
                                {t('footer.theme-label')}
                            </InputLabel>
                            <Select
                                labelId='theme-select-label'
                                label={t('footer.theme-label')}
                                value={`${selectedTheme}`}
                                onChange={handleSelectSiteTheme}
                            >
                                {themes.map((theme, i) => (
                                    <MenuItem key={i} value={theme.index}>
                                        <Typography variant='subtitle2'>{theme.display}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default connect(mapStateToProps)(Footer);
