import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/ProfilePage/styles';
import ProfileAvatar from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileAvatar/ProfileAvatar';
import BasicInformation from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileInformation/BasicInformation';
import { IProfileDetails } from 'src/models/Profile';
import { sendRequestToGetProfileDetails } from 'src/redux/actions/profileActions';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import Stages from 'src/models/enums/stage';
import { useDispatch } from 'react-redux';
import useAuthorization from 'src/hooks/useAuthorization';

type TProfileDetailsProps = {
    id: string,
};

const ProfileDetails = ({
    id,
}: TProfileDetailsProps) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const dispatch = useDispatch();
    const { authorization, profileId } = useAuthorization();

    const [error, setError] = React.useState<Array<string>>([]);
    const [profileDetails, setProfileDetails] = React.useState<IProfileDetails>();

    useEffect(() => {
        if (!profileDetails && profileId && authorization) {
            sendRequestToGetProfileDetails(dispatch, authorization, profileId).then(data => {
                if (!data) setError([ ...error, `profile-page.${id}.get-profile-details-error` ]);
                else setProfileDetails(data);
            });
        }
    }, [profileDetails, profileId, authorization]);

    const reloadProfileDetails = () => {
        sendRequestToGetProfileDetails(dispatch, authorization, profileId).then(data => {
            if (!data) setError([ ...error, `profile-page.${id}.get-profile-details-error` ]);
            else setProfileDetails(data);
        });
    };

    return (
        <div className={styles.profileDetails}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>

            <Grid container spacing={2}>
                <Grid item md={12} lg={4} style={{width:'100%'}}>
                    {profileDetails && (
                        <ProfileAvatar
                            id={id}
                            avatarName={profileDetails.avatarName}
                            onAvatarChanged={reloadProfileDetails}
                        />
                    )}
                </Grid>
                <Grid item md={12} lg={8}>
                    {error.length !== 0 && errors.map((error, i) => (
                        <div key={i}>
                            <Flasher severity='error' stage={Stages.SHOWCASE} message={error} />
                        </div>
                    ))}

                    <BasicInformation
                        id={id}
                        profileDetails={profileDetails}
                        reloadProfileDetails={reloadProfileDetails}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default ProfileDetails;
