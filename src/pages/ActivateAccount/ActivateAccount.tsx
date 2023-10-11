import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { batch, connect, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import FaIcon from 'src/components/atoms/FaIcon';
import PinCell from 'src/components/atoms/PinCell/PinCell';
import Recaptcha from 'src/components/atoms/Recaptcha';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import Stages from 'src/models/enums/stage';
import useStyles, { activateAccountBoxSx, activateAccountFormSx } from 'src/pages/ActivateAccount/styles';
import { sendRequestToGetSecretCode } from 'src/redux/actions/authenticationActions';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import { TRootState } from 'src/redux/reducers';
import StageFlasher from 'src/components/molecules/StatusIndicators/StageFlasher';

const mapStateToProps = (state: TRootState) => ({
    stages: state.stageStore.stages,
    secretCodeLength: state.publicDataStore.publicData.secretCodeLength,
    isSecretCodeSent: state.authenticationStore.accountActivation.isSecretCodeSent,
});

const ActivateAccount = ({
    stages,
    secretCodeLength,
    isSecretCodeSent,
}: ReturnType<typeof mapStateToProps>) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const styles = useStyles();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<{
        phoneNumber: string | null,
        emailAddress: string | null,
        username: string | null,
        activationToken: string | null,
    } | null>(null);

    useEffect(() => {
        dispatch(setStageByName(Stages.PAGE_CONTENT_INITIALIZING) as unknown as AnyAction);

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

        dispatch(removeStage(Stages.PAGE_CONTENT_INITIALIZING) as unknown as AnyAction);

        if (phoneNumber || emailAddress) dispatch(sendRequestToGetSecretCode(emailAddress ?? phoneNumber ?? '') as unknown as AnyAction);

        return () => {
            batch(() => {
                dispatch(removeStage(Stages.REQUEST_TO_GET_SECRET_CODE_DONE) as unknown as AnyAction);
                dispatch(removeStage(Stages.ACTIVATE_ACCOUNT_INVALID_EMAIL_ADDRESS_OR_PHONE_NUMBER) as unknown as AnyAction);
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

    if (data === null) {
        return <Loading stage={Stages.PAGE_CONTENT_INITIALIZING} />;
    }

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
                                disabled={!isSecretCodeSent}
                            />
                        )}

                        <StageFlasher stage={Stages.ACTIVATE_ACCOUNT_INVALID_EMAIL_ADDRESS_OR_PHONE_NUMBER} />

                        <Recaptcha
                            onChange={(token) => console.log(token)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default connect(mapStateToProps)(ActivateAccount);
