import { TRootState } from 'src/redux/reducers';
import { batch, connect, useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStyles, { activateAccountBoxSx, activateAccountFormSx } from 'src/pages/ActivateAccount/styles';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { setStorageMessage, surrogate } from 'src/utilities/otherUtilities';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import { sendRequestToActivateAccount, sendRequestToGetSecretCode } from 'src/redux/actions/authenticationActions';
import { StorageKeys, TokenDestination } from 'src/commons/enums';
import configs from 'src/commons/configs';
import { loginPageName } from 'src/pages/LoginPage/LoginPage';
import { IStorageMessage } from 'src/commons/interfaces';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FaIcon from 'src/components/atoms/FaIcon';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import Grid from '@mui/material/Grid';
import StageFlasher from 'src/components/molecules/StatusIndicators/StageFlasher';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import PinCell from 'src/components/atoms/PinCell/PinCell';
import Button from '@mui/material/Button';
import Recaptcha from 'src/components/atoms/Recaptcha';
import { ITokenData } from 'src/models/Authentication';

const mapStateToProps = (state: TRootState) => ({
    stages: state.stageStore.stages,
    secretCodeEnabled: state.publicDataStore.publicData.secretCodeEnabled,
    secretCodeLength: state.publicDataStore.publicData.secretCodeLength,
    isSecretCodeSent: state.authenticationStore.accountActivation.isSecretCodeSent,
    activationSuccess: state.authenticationStore.accountActivation.activationSuccess,
    error: state.authenticationStore.accountActivation.activationError,
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const ActivateAccount = ({
    stages,
    secretCodeEnabled,
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
    const routeParams = useParams();
    const isActivationTimeElapsed = useIsStageIncluded(Stages.REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED);

    const recaptchaRef = React.createRef<LegacyRef<ReCAPTCHA> | undefined>();
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const [secretCode, setSecretCode] = useState('');
    const [data, setData] = useState<{
        accountId: string,
        phoneNumber: string | null,
        emailAddress: string | null,
        username: string | null,
        activationToken: string | null,
    } | null>(null);

    useEffect(() => {
        surrogate(dispatch, setStageByName(Stages.PAGE_CONTENT_INITIALIZING));

        const { accountId } = routeParams;
        if (!accountId) throw new Error(`Missing route param: accountId`);

        const phoneNumber = searchParams.get('phone-number');
        const emailAddress = searchParams.get('email-address');
        const username = searchParams.get('username');
        const activationToken = searchParams.get('activation-token');

        setData({
            accountId: accountId as string,
            phoneNumber: phoneNumber?.split(',').join(' ') ?? null,
            emailAddress,
            username,
            activationToken,
        });

        surrogate(dispatch, removeStage(Stages.PAGE_CONTENT_INITIALIZING));

        return () => {
            batch(() => {
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_DONE));
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_INVALID_EMAIL_OR_PHONE));
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_NO_PENDING_ACTIVATION_FOUND));
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED));
            });
        };
    }, []);

    useEffect(() => {
        if (data && (data.phoneNumber || data.emailAddress) && secretCodeEnabled)
            surrogate(dispatch, sendRequestToGetSecretCode(data.accountId, data.emailAddress ? TokenDestination.EMAIL : TokenDestination.SMS));
    }, [data, secretCodeEnabled]);

    const secretCodeCaptionTranslationKey = useMemo(() => {
        const isRegisteredByEmail = data && data.emailAddress;
        return `activate-account-page.secret-code-caption-by-${isRegisteredByEmail ? 'email-address' : 'phone-number'}`;
    }, [data]);

    const shouldShowPinCell = useMemo(
        () => secretCodeEnabled && stages.some(stage => stage.name === Stages.REQUEST_TO_GET_SECRET_CODE_DONE),
        [stages],
    );

    const handleSecretCodeInput = (secretCode: string) => setSecretCode(secretCode);

    useEffect(() => {
        const secretCodeValid = (secretCode.length === secretCodeLength && secretCodeEnabled) || !secretCodeEnabled;
        const shouldActivateAccount = data && (data.emailAddress || data.phoneNumber) &&
            data.activationToken && secretCodeValid && !isActivationTimeElapsed;

        if (shouldActivateAccount) {
            const recaptchaTokenToSend = !configs.recaptchaEnabled ? null : (
                configs.recaptchaVisible ? recaptchaToken : (recaptchaRef.current as unknown as ReCAPTCHA)?.getValue()
            );

            if (configs.recaptchaEnabled && !recaptchaTokenToSend) {
                alert(t(`messages.${configs.recaptchaVisible ? 'recaptcha-not-clicked' : 'recaptcha-token-missing'}`));
                return;
            }

            const requestBody: ITokenData = {
                secretCode,
                currentToken: data!.activationToken!,
                destination: data?.phoneNumber ? TokenDestination.SMS : TokenDestination.EMAIL,
            };

            surrogate(dispatch, sendRequestToActivateAccount(data!.accountId, requestBody, recaptchaToken));
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
                        <StageFlasher stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_SECRET_CODE_MISSING} />
                        <StageFlasher stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_TOKEN_EXPIRED} />
                        <StageFlasher stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_INVALID_SECRET_CODE} />
                        <StageFlasher stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_MISMATCHED_TOKENS} />
                        {error && <Flasher
                            severity='error'
                            stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_TOKEN_EXPIRED}
                            message={`activate-account-page.activate-account-response-error-410-by-${(error as any)?.data}`}
                        />}
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
                        {
                            secretCodeEnabled && (
                            <>
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
                            </>
                        )}

                        {isActivationTimeElapsed && (
                            <Button
                                variant='contained'
                                onClick={() => console.log('request another activation email')}
                            >
                                {t('activate-account-page.request-another-activation-email-button')}
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
