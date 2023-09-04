import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FaIcon from 'src/components/atoms/FaIcon';
import Recaptcha from 'src/components/atoms/Recaptcha';
import useStyles, { resetPasswordBoxSx, resetPasswordFormSx } from 'src/pages/ResetPassword/styles';

const ResetOrChangePassword = () => {
    const { t } = useTranslation();
    const styles = useStyles();

    const isRegisteredByEmail = true;
    const isResetPassword = false;

    return (
        <div className={styles.resetPasswordWrapper}>
            <Box sx={resetPasswordBoxSx}>
                <Typography className={styles.title}>
                    {t(`reset-password-page.${isResetPassword ? 'reset-password-tiitle' : 'change-password-title'}`)}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faKey} />
                </Typography>

                <Grid container spacing={2} sx={resetPasswordFormSx}>
                    <Grid item sm={6} xs={12}>
                        <Typography variant='subtitle1'>
                            {t(`reset-password-page.${isRegisteredByEmail ? 'email-address-label' : 'phone-number-label'}`)}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            style={{fontWeight: 'bold'}}
                        >
                            nguyen.le.kim.phuc@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography variant='subtitle1'>
                            {t('reset-password-page.username-label')}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            style={{fontWeight: 'bold'}}
                        >
                            nlkp89
                        </Typography>
                    </Grid>
                    {!isResetPassword && (
                        <Grid item xs={12}>
                            <TextField
                                label={t('reset-password-page.current-password-label')}
                                style={{width: '100%'}}
                            />
                        </Grid>
                    )}
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('reset-password-page.new-password-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('reset-password-page.new-password-confirm-label')}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Recaptcha
                            onChange={(token) => console.log(token)}
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

export default ResetOrChangePassword;
