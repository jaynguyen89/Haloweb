import { faComputer } from '@fortawesome/free-solid-svg-icons/faComputer';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons/faMobileScreen';
import { Card, CardActions, CardContent, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FaIcon from 'src/components/atoms/FaIcon';
import useStyles from 'src/pages/ProfilePage/styles';

type TTrustedDeviceProps = {
    id: string,
};

const TrustedDevices = ({
    id,
}: TTrustedDeviceProps) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <div className={styles.trustedDevices}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>

            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <p className='title'>{t(`profile-page.${id}.devices-list`, {count: 2, plural: 's'})}</p>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Card className='device-info'>
                        <CardContent style={{position: 'relative'}}>
                            <FaIcon wrapper='fa' t='obj' size='lg' color={theme.palette.info.main} ic={faComputer} />
                            <p><b>Device name:</b> JAY-PC</p>
                            <p><b>Device type:</b> Computer/laptop</p>
                        </CardContent>
                        <CardActions>
                            <Button size='small' color='error'>{t('buttons.remove')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Card className='device-info'>
                        <CardContent style={{position: 'relative'}}>
                            <FaIcon wrapper='fa' t='obj' size='lg' color={theme.palette.info.main} ic={faMobileScreen} />
                            <p><b>Device name:</b> Pixel 9PF</p>
                            <p><b>Device type:</b> Mobile phone</p>
                        </CardContent>
                        <CardActions>
                            <Button size='small' color='error'>{t('buttons.remove')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default TrustedDevices;
