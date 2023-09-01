import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { Box, FormControl, InputLabel, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import FaIcon from 'src/components/atoms/FaIcon';
import useStyles, { registrationBoxSx, registrationFormSx } from 'src/pages/AccountRegistration/styles';

const AccountRegistration = () => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <div className={styles.registrationWrapper}>
            <Box sx={registrationBoxSx}>
                <Typography className={styles.title}>
                    {t('registration-page.title')}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faCircleUser}/>
                </Typography>
                <Typography variant='subtitle1' className={styles.subtitle}>
                    <Trans i18nKey='registration-page.subtitle'>
                        Already have account? <Link to='/login'>Login here</Link>.
                    </Trans>
                </Typography>

                <Grid container spacing={2} sx={registrationFormSx}>
                    <Grid item md={5} xs={12}>
                        <TextField
                            label={t('registration-page.email-address-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item md={1} xs={12}>
                        <div className={styles.orLabel}>{t('labels.or')}</div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid container spacing={1}>
                            <Grid item md={4} sm={3} xs={5}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id='area-code-select-label'>{t('registration-page.area-code-label')}</InputLabel>
                                    <Select
                                        labelId='area-code-select-label'
                                        label={t('registration-page.area-code-label')}
                                    >
                                        <MenuItem value={10}>
                                            84 - VNM
                                            <CountryFlag isoCountryCode='vn' className={styles.flagIcon}/>
                                        </MenuItem>
                                        <MenuItem value={20}>
                                            61 - AUS
                                            <CountryFlag isoCountryCode='au' className={styles.flagIcon}/>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={8} sm={9} xs={7}>
                                <TextField
                                    label={t('registration-page.phone-number-label')}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.password-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.password-confirm-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.username-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel
                                id='area-code-select-label'>{t('registration-page.gender-label')}</InputLabel>
                            <Select
                                labelId='area-code-select-label'
                                label={t('registration-page.gender-label')}
                            >
                                <MenuItem value={0}>
                                    Male
                                </MenuItem>
                                <MenuItem value={1}>
                                    Female
                                </MenuItem>
                                <MenuItem value={2}>
                                    Others
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            label={t('registration-page.given-name-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            label={t('registration-page.middle-name-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            label={t('registration-page.family-name-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('registration-page.full-name-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            className={styles.submitButton}
                        >
                            {t('buttons.submit')}&nbsp;
                            <FaIcon wrapper='fa' t='obj' ic={faPaperPlane} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default AccountRegistration;
