import { Checkbox, FormControl, FormControlLabel, InputLabel, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import FaIcon from 'src/components/atoms/FaIcon';
import SocialIcons from 'src/components/atoms/SocialIcons/SocialIcons';
import Stages from 'src/models/enums/stage';
import useStyles, { helpBoxSx, loginBoxSx, loginFormSx } from 'src/pages/LoginPage/styles';
import { setStage } from 'src/redux/actions/stageActions';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons/faFingerprint';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import vars from 'src/commons/variables/cssVariables.scss';

const LoginPage = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const styles = useStyles();

    useEffect(() => {
        dispatch(setStage({
            name: Stages.HIDE_SITE_HEADER,
            canClear: false,
        }) as unknown as AnyAction);
    });

    return (
        <div className={styles.loginWrapper}>
            <Box sx={loginBoxSx}>
                <Typography className={styles.title}>
                    {t('login-page.title')}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faFingerprint} />
                </Typography>

                <Grid container spacing={2} sx={loginFormSx}>
                    <Grid item md={5} xs={12}>
                        <TextField
                            label={t('login-page.email-address-label')}
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
                                        id='area-code-select-label'>{t('login-page.area-code-label')}</InputLabel>
                                    <Select
                                        labelId='area-code-select-label'
                                        label={t('login-page.area-code-label')}
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
                                    label={t('login-page.phone-number-label')}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('login-page.password-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked/>}
                            label={t('login-page.trusted-checkbox-text')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            className={styles.loginButton}
                        >
                            {t('buttons.submit')}&nbsp;
                            <FaIcon wrapper='fa' t='obj' ic={faPaperPlane} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={helpBoxSx}>
                <Typography variant='subtitle2' mb={vars.micro}>
                    <Trans i18nKey='login-page.forgot-password-text'>
                        Forgot your password? Please <Link to='/forgot-password'>click here</Link> to reset password.
                    </Trans>
                </Typography>
                <Typography variant='subtitle2'>
                    <Trans i18nKey='login-page.register-account-text'>
                        Haven't had an account yet? Please <Link to='/register-account'>click here</Link> to create a new account.
                    </Trans>
                </Typography>

                <Box className={styles.socialLogins}>
                    <p>{t('login-page.social-login-text')}</p>
                    <SocialIcons
                        icons={[
                            {iconName: 'facebook'},
                            {iconName: 'google'},
                            {iconName: 'twitter'},
                            {iconName: 'instagram'},
                            {iconName: 'microsoft'},
                            {iconName: 'linkedin'},
                        ]}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default LoginPage;
