import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/LoginPage/LoginFailureMessage/styles';

type TLoginFailureProps = {
    count: number,
    lockedCount: number,
    loginFailedThreshold: number,
    lockedOutThreshold: number,
    lockedOutDuration: number,
};

const LoginFailure = ({
    count,
    lockedCount,
    loginFailedThreshold,
    lockedOutThreshold,
    lockedOutDuration,
}: TLoginFailureProps) => {
    const { t } = useTranslation();
    const styles = useStyles();

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

export default LoginFailure;
