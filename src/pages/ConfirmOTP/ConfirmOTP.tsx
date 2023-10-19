import { faShieldHalved } from '@fortawesome/free-solid-svg-icons/faShieldHalved';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import FaIcon from 'src/components/atoms/FaIcon';
import PinCell from 'src/components/atoms/PinCell/PinCell';
import useStyles, { otpBoxSx } from 'src/pages/ConfirmOTP/styles';

const ConfirmOTP = () => {
    const { t } = useTranslation();
    const styles = useStyles();

    const isOTPConfirmation = false;
    const isRegisteredByEmail = true;
    const { what, which } = useMemo(
        () => ({
            what: isOTPConfirmation ? 'OTP' : 'PIN',
            which: isRegisteredByEmail ? 'email-address' : 'phone-number',
            }),
        [
            isOTPConfirmation,
            isRegisteredByEmail,
        ],
    );

    const otpSubtitleTranslationKey = useMemo(
        () => `otp-page.subtitle-by-${isRegisteredByEmail ? 'email-address' : 'phone-number'}`,
        [isRegisteredByEmail],
    );

    return (
        <div className={styles.otpWrapper}>
            <Box sx={otpBoxSx}>
                <Typography variant='h1' className={styles.title}>
                    {t(`otp-page.${isOTPConfirmation ? 'otp' : 'tfa'}-title`)}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faShieldHalved} />
                </Typography>

                <PinCell onChange={(pin) => console.log(pin)} />

                <div className={styles.subtitle}>
                    <Trans
                        i18nKey={otpSubtitleTranslationKey}
                        what={what}
                    >
                        Don't get your {{what}}? <a onClick={() => console.log('forward token')}>Send it to your {which}</a>.
                    </Trans>
                </div>
            </Box>
        </div>
    );
};

export default ConfirmOTP;
