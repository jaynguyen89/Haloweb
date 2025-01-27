import Grid from '@mui/material/Grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/ProfilePage/styles';
import ProfileAvatar from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileAvatar/ProfileAvatar';
import BasicInformation from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileForm/BasicInformation';

type TProfileDetailsProps = {
    id: string,
};

const ProfileDetails = ({
    id,
}: TProfileDetailsProps) => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <div className={styles.profileDetails}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>

            <Grid container spacing={2}>
                <Grid item md={12} lg={4} style={{width:'100%'}}>
                    <ProfileAvatar />
                </Grid>
                <Grid item md={12} lg={8}>
                    <BasicInformation id={id} />
                </Grid>
            </Grid>
        </div>
    );
};

export default ProfileDetails;
