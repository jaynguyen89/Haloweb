import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import FaIcon from 'src/components/atoms/FaIcon';
import NumberCell from 'src/components/atoms/NumberCell/NumberCell';
import Recaptcha from 'src/components/atoms/Recaptcha';
import useStyles, { activateAccountBoxSx, activateAccountFormSx } from 'src/pages/ActivateAccount/styles';
import { otpBoxSx } from 'src/pages/ConfirmOTP/styles';

const ActivateAccount = () => {
    const { t } = useTranslation();
    const styles = useStyles();

    const isRegisteredByEmail = true;

    return (
        <div className={styles.activateAccountWrapper}>
            <Box sx={activateAccountBoxSx}>
                <Typography variant='h1' className={styles.title}>
                    {t('activate-account-page.title')}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faUserCheck} />
                </Typography>

                <Grid container spacing={2} sx={activateAccountFormSx}>
                    <Grid item sm={6} xs={12}>
                        <Typography variant='subtitle1'>
                            {t(`activate-account-page.${isRegisteredByEmail ? 'email-address-label' : 'phone-number-label'}`)}
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
                            {t('activate-account-page.username-label')}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            style={{fontWeight: 'bold'}}
                        >
                            nlkp89
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>
                            {t('activate-account-page.secret-code-title')}
                        </Typography>
                        <p className={styles.secretCodeCaption}>
                            <FaIcon wrapper='fa' t='obj' ic={faQuestionCircle} />&nbsp;
                            {t('activate-account-page.secret-code-caption', {which: 'email address'})}
                        </p>

                        <NumberCell numOfCells={8} />
                        <Recaptcha
                            onChange={(token) => console.log(token)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ActivateAccount;
