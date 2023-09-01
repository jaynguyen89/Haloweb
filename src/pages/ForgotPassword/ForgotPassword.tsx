import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { Box, FormControl, InputLabel, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import FaIcon from 'src/components/atoms/FaIcon';
import Recaptcha from 'src/components/atoms/Recaptcha';
import useStyles, { forgotPasswordBoxSx, forgotPasswordFormSx } from 'src/pages/ForgotPassword/styles';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <div className={styles.forgotPasswordWrapper}>
            <Box sx={forgotPasswordBoxSx}>
                <Typography className={styles.title}>
                    {t('forgot-password-page.title')}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faUnlock} />
                </Typography>

                <Grid container spacing={2} sx={forgotPasswordFormSx}>
                    <Grid item md={5} xs={12}>
                        <TextField
                            label={t('forgot-password-page.email-address-label')}
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
                                        id='area-code-select-label'>{t('forgot-password-page.area-code-label')}</InputLabel>
                                    <Select
                                        labelId='area-code-select-label'
                                        label={t('forgot-password-page.area-code-label')}
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
                                    label={t('forgot-password-page.phone-number-label')}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Recaptcha
                            onChange={(token) => console.log(token)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            className={styles.forgotPasswordButton}
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

export default ForgotPassword;
