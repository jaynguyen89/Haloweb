import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import FaIcon from 'src/components/atoms/FaIcon';
import NumberCell from 'src/components/atoms/NumberCell/NumberCell';
import Recaptcha from 'src/components/atoms/Recaptcha';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import Stages from 'src/models/enums/stage';
import useStyles, { activateAccountBoxSx, activateAccountFormSx } from 'src/pages/ActivateAccount/styles';
import { clearStage, setStageByName } from 'src/redux/actions/stageActions';

const ActivateAccount = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const styles = useStyles();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<{
        isRegisteredByEmail: boolean | null,
        phoneNumber: string | null,
        emailAddress: string | null,
        activationToken: string | null,
    } | null>(null);

    useEffect(() => {
        dispatch(setStageByName(Stages.PAGE_CONTENT_INITIALIZING) as unknown as AnyAction);

        const phoneNumber = searchParams.get('phone-number');
        const emailAddress = searchParams.get('email-address');
        const activationToken = searchParams.get('activation-token');
        setData({
            isRegisteredByEmail: emailAddress !== null,
            phoneNumber,
            emailAddress,
            activationToken,
        });

        dispatch(clearStage() as unknown as AnyAction);
    }, []);

    const secretCodeCaptionTranslationKey = useMemo(
        () => `activate-account-page.secret-code-caption-by-${data?.isRegisteredByEmail ? 'email-address' : 'phone-number'}`,
        [data?.isRegisteredByEmail],
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
                            {t(`activate-account-page.${data?.isRegisteredByEmail ? 'email-address-label' : 'phone-number-label'}`)}
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
                            {t(secretCodeCaptionTranslationKey)}
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
