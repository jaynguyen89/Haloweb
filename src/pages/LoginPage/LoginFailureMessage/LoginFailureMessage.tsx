import { HttpStatusCode } from 'axios';
import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useStyles from 'src/pages/LoginPage/LoginFailureMessage/styles';
import { TRootState } from 'src/redux/reducers';
import configs from 'src/commons/configs';

const mapStateToProps = (state: TRootState) => ({
    loginFailure: state.authenticationStore.loginFailure,
});

const LoginFailureMessage = ({ loginFailure }: ReturnType<typeof mapStateToProps>) => {
    const { t } = useTranslation();
    const styles = useStyles();

    const { count, lockedCount, statusCode, timestamp, isSuspended } = loginFailure ?? {};
    const { loginFailedThreshold, lockedOutThreshold, lockedOutDuration } = configs;

    if (isSuspended)
        return (
            <div className={styles.wrapper}>
                <p>{t('login-page.suspend-message-1')}</p>
                <p>
                    <Trans i18nKey='login-page.suspend-message-2'>
                    Please <a onClick={() => console.log('send email to confirm ownership')}>click here</a> to confirm your account ownership&nbsp;
                        and remove the Suspend status on your account.
                    </Trans>
                </p>
                <p>
                    <Trans i18nKey='login-page.suspend-message-3'>
                    If you've forgotten your password, please also try to <Link to='/forgot-password'>&nbsp;
                        reset password</Link> after the above step.
                    </Trans>
                </p>
            </div>
        );

    if (statusCode === HttpStatusCode.Locked && lockedCount < lockedOutThreshold - 1) {
        const timeLapse = useMemo(() => ((new Date().getTime() - timestamp) / 60000).toFixed(1), [timestamp]);
        const remainingLockedOutDuration = useMemo(() => (lockedOutDuration / 60000) - timeLapse, [lockedOutDuration, timeLapse]);

        const minutes = useMemo(() => Math.floor(remainingLockedOutDuration), [remainingLockedOutDuration]);
        const seconds = useMemo(() => Math.floor((remainingLockedOutDuration - minutes) * 60), [remainingLockedOutDuration, minutes]);

        return (
            <div className={styles.wrapper}>
                <p>{t('login-page.locked-message-1')}</p>
                {remainingLockedOutDuration <= 0 ? (
                    <p>{t('login-page.locked-message-3', {minutes: lockedOutDuration / 60000})}</p>
                ) : (
                    <p>{t('login-page.locked-message-2', {minutes, seconds})}</p>
                )}
            </div>
        );
    }

    const loginFailureMessageKeyParams = useMemo(() => {
        const key = lockedCount === 0 || lockedCount < lockedOutThreshold - 1
            ? 'login-page.failure-message-2'
            : 'login-page.failure-message-3';

        const remainingAttempts = loginFailedThreshold - count;

        return {
            key,
            params: {
                wait: lockedOutDuration / 60000,
                attempts: remainingAttempts,
                plural: remainingAttempts > 1 ? 's' : '',
            },
        };
    }, [count, lockedCount]);

    const {key, params} = loginFailureMessageKeyParams;
    return (
        <div className={styles.wrapper}>
            {t('login-page.failure-message-1', {count, plural: count === 1 ? '' : 's'})}
            {t(key, params)}
        </div>
    );
};

export default connect(mapStateToProps)(LoginFailureMessage);
