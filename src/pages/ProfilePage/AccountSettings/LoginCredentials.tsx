import { CheckCircle, ErrorRounded } from '@mui/icons-material';
import { Chip, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/ProfilePage/styles';

type TLoginCredentialsProps = {
    id: string;
};

const LoginCredentials = ({
    id,
}: TLoginCredentialsProps) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={styles.loginCredentials}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant='body1'>Hello <b>John Doe (john.doe123)</b>, here are your login credentials.</Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={12} className='credential'>
                    <p><b>{t(`profile-page.${id}.email-address`)}</b></p>
                    <p>
                        <span>john.doe123@gmail.com</span>
                        <Chip className='verification' label={t(`profile-page.${id}.confirmed`)} color='success' size='small' icon={<CheckCircle />} />
                    </p>
                </Grid>
                <Grid item md={6} sm={6} xs={12} className='credential'>
                    <p><b>{t(`profile-page.${id}.phone-number`)}</b></p>
                    <p>
                        <span>(+61) 411 222 333</span>
                        <Chip className='verification' label={t(`profile-page.${id}.unconfirmed`)} color='warning' size='small' icon={<ErrorRounded/>} />
                        <p><a href='#'>{t(`profile-page.${id}.confirm-now`)}</a></p>
                    </p>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className='add-credential'>
                    <p>{t(`profile-page.${id}.add-phone-number`)}</p>
                    <TextField />
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginCredentials;
