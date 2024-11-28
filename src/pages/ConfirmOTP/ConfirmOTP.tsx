import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons/faShieldHalved';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FaIcon from 'src/components/atoms/FaIcon';
import useStyles, { otpBoxSx } from 'src/pages/ConfirmOTP/styles';
import { sendRequestToVerifyOtp } from 'src/redux/actions/authenticationActions';
import { TRootState } from 'src/redux/reducers';
import { surrogate } from 'src/utilities/otherUtilities';

const mapStateToProps = (state: TRootState) => ({
    authorization: state.authenticationStore.authorization,
});

const ConfirmOTP = ({
    authorization,
}: ReturnType<typeof mapStateToProps>) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();
    const styles = useStyles();
    const { byEmail } = useParams();
    const [otp, setOtp] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    const isRegisteredByEmail = useMemo(() => +byEmail === 1, [byEmail]);
    const { which, opposite, subtitleTranslationKey } = useMemo(
        () => ({
            which: isRegisteredByEmail ? 'email-address' : 'phone-number',
            opposite: isRegisteredByEmail ? 'phone-number' : 'email-address',
            subtitleTranslationKey: `otp-page.subtitle-by-${isRegisteredByEmail ? 'phone-number' : 'email-address'}`,
        }),
        [isRegisteredByEmail],
    );

    // useEffect(() => {
    //     if (!authorization) {
    //         alert(t('otp-page.missing-authentication'));
    //         navigate('/login');
    //     }
    // }, [authorization]);

    const handleButtonClick = () => {
        if (!otp) {
            alert(t('otp-page.missing-otp'));
            return;
        }

        if (!authorization) {
            alert(t('otp-page.missing-authentication'));
            navigate('/login');
            return;
        }

        surrogate(dispatch, sendRequestToVerifyOtp(authorization, otp));
    };

    return (
        <div className={styles.otpWrapper}>
            <Box sx={otpBoxSx}>
                <Typography variant='h1' className={styles.title}>
                    {t(`otp-page.otp-title`)}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faShieldHalved} />
                </Typography>

                <p className={styles.explanation}>{t(`otp-page.explanation-${which}`)}</p>
                <div className={styles.otpInputWrapper}>
                    <input
                        placeholder='Enter OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button
                        disabled={buttonDisabled}
                        variant='contained'
                        onClick={handleButtonClick}
                    >
                        <FaIcon
                            wrapper='fa'
                            t='obj'
                            color={buttonDisabled ? theme.palette.secondary.contrastText : theme.palette.secondary.light}
                            ic={faPaperPlane}
                        />
                    </Button>
                </div>

                <div className={styles.subtitle}>
                    <Trans i18nKey={subtitleTranslationKey}>
                        Don't get your OTP? <Link onClick={() => console.log('forward token')}>Send it to your {opposite}</Link>.
                    </Trans>
                </div>
            </Box>
        </div>
    );
};

export default connect(mapStateToProps)(ConfirmOTP);
