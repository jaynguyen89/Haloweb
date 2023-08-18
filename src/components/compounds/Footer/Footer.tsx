import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, Select, SelectChangeEvent, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import useStyles, { footerSx } from 'src/components/compounds/Footer/styles';
import { changeSiteLanguage } from 'src/redux/actions/languageActions';
import { TRootState } from 'src/redux/reducers';
import { languageResourceKeys } from 'src/translation/i18next';

const mapStateToProps = (state: TRootState) => ({
    siteLanguage: state.languageStore.siteLanguage,
});

const Footer = ({
    siteLanguage: {
        selected: selectedLanguage,
        detected: detectedLanguage,
    },
}: ReturnType<typeof mapStateToProps>) => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const theme = useTheme();
    const styles = useStyles();

    const handleSelectSiteLanguage = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (languageResourceKeys.includes(value)) {
            dispatch(changeSiteLanguage(value, i18n) as unknown as AnyAction);
            return;
        }

        console.error(`Language not supported: ${value}`);
    };

    return (
        <Box sx={{ ...footerSx }}>
            <Container maxWidth='xl'>
                <Grid container spacing={2}>
                    <Grid item md={10} xs={12}>
                        <Typography variant='h5' className={styles.brand}>
                            Halo Marketplace
                        </Typography>
                        <Typography variant='body2'>
                            Initialized since July 2023 by <b>Jay Nguyen</b>
                        </Typography>
                    </Grid>
                    <Grid item md={2} xs={12} sx={{alignSelf: 'center'}}>
                        <FormControl size='small' fullWidth>
                            <InputLabel id='language-select-label'>Site Language</InputLabel>
                            <Select
                                labelId='language-select-label'
                                label='Site Language'
                                value={selectedLanguage ?? detectedLanguage}
                                onChange={handleSelectSiteLanguage}
                            >
                                <MenuItem value='vi'>
                                    <Typography variant='subtitle2'>Vietnamese</Typography>
                                </MenuItem>
                                <MenuItem value='en'>
                                    <Typography variant='subtitle2'>English</Typography>
                                </MenuItem>
                                <MenuItem value='jp'>
                                    <Typography variant='subtitle2'>Japanese</Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default connect(mapStateToProps)(Footer);
