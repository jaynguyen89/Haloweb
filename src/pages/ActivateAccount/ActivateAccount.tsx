import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { batch, connect, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import configs from 'src/commons/configs';
import FaIcon from 'src/components/atoms/FaIcon';
import PinCell from 'src/components/atoms/PinCell/PinCell';
import Recaptcha from 'src/components/atoms/Recaptcha';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import useStyles, { activateAccountBoxSx, activateAccountFormSx } from 'src/pages/ActivateAccount/styles';
import { sendRequestToGetSecretCode } from 'src/redux/actions/authenticationActions';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import { TRootState } from 'src/redux/reducers';
import StageFlasher from 'src/components/molecules/StatusIndicators/StageFlasher';
import { setStorageMessage, surrogate } from 'src/utilities/otherUtilities';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import { IStorageMessage } from 'src/commons/interfaces';
import { StorageKeys } from 'src/commons/enums';
import { loginPageName } from 'src/pages/LoginPage/LoginPage';

const mapStateToProps = (state: TRootState) => ({
    stages: state.stageStore.stages,
    secretCodeLength: state.publicDataStore.publicData.secretCodeLength,
    isSecretCodeSent: state.authenticationStore.accountActivation.isSecretCodeSent,
    activationSuccess: state.authenticationStore.accountActivation.activationSuccess,
    error: state.authenticationStore.accountActivation.activationError,
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const ActivateAccount = ({
    stages,
    secretCodeLength,
    isSecretCodeSent,
    activationSuccess,
    error,
}: ReturnType<typeof mapStateToProps>) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const styles = useStyles();

    const [searchParams] = useSearchParams();
    const isActivationTimeElapsed = useIsStageIncluded(Stages.REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED);

    const recaptchaRef = React.createRef<LegacyRef<ReCAPTCHA> | undefined>();
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const [secretCode, setSecretCode] = useState('');
    const [data, setData] = useState<{
        phoneNumber: string | null,
        emailAddress: string | null,
        username: string | null,
        activationToken: string | null,
    } | null>(null);

    useEffect(() => {
        surrogate(dispatch, setStageByName(Stages.PAGE_CONTENT_INITIALIZING));

        const phoneNumber = searchParams.get('phone-number');
        const emailAddress = searchParams.get('email-address');
        const username = searchParams.get('username');
        const activationToken = searchParams.get('activation-token');

        setData({
            phoneNumber: phoneNumber?.split(',').join(' ') ?? null,
            emailAddress,
            username,
            activationToken,
        });

        surrogate(dispatch, removeStage(Stages.PAGE_CONTENT_INITIALIZING));

        if (phoneNumber || emailAddress) surrogate(dispatch, sendRequestToGetSecretCode(emailAddress ?? phoneNumber ?? ''));

        return () => {
            batch(() => {
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_DONE));
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_INVALID_EMAIL_OR_PHONE));
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_NO_PENDING_ACTIVATION_FOUND));
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED));
            });
        };
    }, []);

    const secretCodeCaptionTranslationKey = useMemo(() => {
        const isRegisteredByEmail = data && data.emailAddress;
        return `activate-account-page.secret-code-caption-by-${isRegisteredByEmail ? 'email-address' : 'phone-number'}`;
    }, [data]);

    const shouldShowPinCell = useMemo(
        () => stages.some(stage => stage.name === Stages.REQUEST_TO_GET_SECRET_CODE_DONE),
        [stages],
    );

    const handleSecretCodeInput = (secretCode: string) => setSecretCode(secretCode);

    useEffect(() => {
        const shouldActivateAccount = data && (data.emailAddress || data.phoneNumber) &&
            data.activationToken && secretCode.length === secretCodeLength && !isActivationTimeElapsed;

        if (shouldActivateAccount) {
            const recaptchaTokenToSend = !configs.recaptchaEnabled ? null : (
                configs.recaptchaVisible ? recaptchaToken : (recaptchaRef.current as unknown as ReCAPTCHA)?.getValue()
            );

            if (configs.recaptchaEnabled && !recaptchaTokenToSend) {
                alert(t(`messages.${configs.recaptchaVisible ? 'recaptcha-not-clicked' : 'recaptcha-token-missing'}`));
                return;
            }
        }
    }, [data, secretCode, isActivationTimeElapsed, recaptchaToken]);

    useEffect(() => {
        if (activationSuccess) {
            setStorageMessage(dispatch, {
                storageKey: StorageKeys.ACCOUNT_ACTIVATION_SUCCESS_STORAGE_KEY,
                targetPage: loginPageName,
                messageKey: 'activate-account-page.activate-account-success',
            } as IStorageMessage);

            navigate('/login');
        }
    }, [activationSuccess]);

    if (data === null) return <Loading stage={Stages.PAGE_CONTENT_INITIALIZING} />;

    return (
        <div className={styles.activateAccountWrapper}>
            <Box sx={activateAccountBoxSx}>
                <Typography variant='h1' className={styles.title}>
                    {t('activate-account-page.title')}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faUserCheck} />
                </Typography>

                <Grid container spacing={2} sx={activateAccountFormSx}>
                    <Grid item xs={12}>
                        <StageFlasher stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_MISSING_EMAIL_OR_PHONE} />
                        <StageFlasher stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_TOKEN_EXPIRED} />
                        <StageFlasher stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_INVALID_TOKEN_TYPE} />
                        <Flasher
                            severity='error'
                            stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_MISMATCHED_TOKENS}
                            message={`activate-account-page.activate-account-response-error-409-by-${(error as any)?.data === 'token' ? 'activation-token' : 'secret-code'}`}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography variant='subtitle1'>
                            {t(`activate-account-page.${data.emailAddress ? 'email-address-label' : 'phone-number-label'}`)}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            style={{fontWeight: 'bold'}}
                        >
                            {data.emailAddress || `+${data.phoneNumber}`}
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
                            {data.username || <FaIcon wrapper='fa' t='obj' ic={faMinus} />}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>
                            {t('activate-account-page.secret-code-title')}
                        </Typography>
                        {isSecretCodeSent && (
                            <p className={styles.secretCodeCaption}>
                                <FaIcon wrapper='fa' t='obj' ic={faQuestionCircle} />&nbsp;
                                {t(secretCodeCaptionTranslationKey)}
                            </p>
                        )}

                        <Loading stage={Stages.REQUEST_TO_GET_SECRET_CODE_BEGIN} />
                        {shouldShowPinCell && (
                            <PinCell
                                type='text'
                                numOfCells={secretCodeLength}
                                disabled={!isSecretCodeSent || isActivationTimeElapsed}
                                onChange={handleSecretCodeInput}
                            />
                        )}

                        <StageFlasher stage={Stages.REQUEST_TO_GET_SECRET_CODE_INVALID_EMAIL_OR_PHONE} />
                        <StageFlasher stage={Stages.REQUEST_TO_GET_SECRET_CODE_NO_PENDING_ACTIVATION_FOUND} />
                        <StageFlasher stage={Stages.REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED} />
                        {isActivationTimeElapsed && (
                            <Button
                                variant='contained'
                                onClick={() => console.log('request another activation email')}
                            >
                                {t('activate-account-page.request-another-activation-email-button')}
                                <FaIcon wrapper='fa' t='obj' ic={faPaperPlane} />
                            </Button>
                        )}

                        <Loading stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_BEGIN} />

                        <Recaptcha
                            recaptchaRef={recaptchaRef as any}
                            onChange={(token) => setRecaptchaToken(token)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default connect(mapStateToProps)(ActivateAccount);
