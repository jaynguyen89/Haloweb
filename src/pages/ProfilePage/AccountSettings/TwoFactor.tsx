import { ErrorRounded } from '@mui/icons-material';
import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/ProfilePage/styles';

type TTwoFactorProps = {
    id: string,
};

const TwoFactor = ({
    id,
}: TTwoFactorProps) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={styles.twoFactors}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
            <p>
                <b style={{marginRight: '0.5rem'}}>Status:</b>
                <Chip size='small' color='warning' label={t(`profile-page.${id}.status-disabled`)} icon={<ErrorRounded/>} />
            </p>
            <Button color='secondary' size='small' variant='contained'>{t(`profile-page.${id}.enable-label`)}</Button>
        </div>
    );
};

export default TwoFactor;
