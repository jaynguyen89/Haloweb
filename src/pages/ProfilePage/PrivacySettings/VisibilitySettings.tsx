import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/ProfilePage/styles';

type TVisibilitySettingsProps = {
    id: string,
};

const VisibilitySettings = ({
    id,
}: TVisibilitySettingsProps) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={styles.visibilitySettings}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
        </div>
    );
};

export default VisibilitySettings;
