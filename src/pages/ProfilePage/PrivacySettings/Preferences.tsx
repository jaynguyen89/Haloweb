import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/ProfilePage/styles';

type TPreferencesProps = {
    id: string,
};

const Preferences = ({
    id,
}: TPreferencesProps) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={styles.preferences}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
        </div>
    );
};

export default Preferences;
