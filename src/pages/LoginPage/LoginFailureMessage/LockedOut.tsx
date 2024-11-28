import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/LoginPage/LoginFailureMessage/styles';

type TLockedOutProps = {
    timestamp: number,
    lockedOutDuration: number,
};

const LockedOut = ({
    timestamp,
    lockedOutDuration,
}: TLockedOutProps) => {
    const { t } = useTranslation();
    const styles = useStyles();

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
};

export default LockedOut;
