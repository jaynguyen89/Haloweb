import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { IProfileDetails } from 'src/models/Profile';
import Websites from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileInformation/Websites/Websites';
import useAuthorization from 'src/hooks/useAuthorization';
import { useDispatch } from 'react-redux';
import { sendRequestToGetProfileDetails } from 'src/redux/actions/profileActions';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import Stages from 'src/models/enums/stage';
import FormSkeleton from 'src/components/atoms/Skeletons/FormSkeleton';
import TableSkeleton from 'src/components/atoms/Skeletons/TableSkeleton';
import ProfileForm from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileInformation/ProfileForm/ProfileForm';

type TBasicInfoProps = {
    id: string,
};

const BasicInformation = ({
    id,
}: TBasicInfoProps) => {
    const { t } = useTranslation();
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
        <div className='profile-form'>
            {error.length !== 0 && errors.map((error, i) => (
                <div key={i}>
                    <Flasher severity='error' stage={Stages.SHOWCASE} message={error} />
                </div>
            ))}

            <h4>{t(`profile-page.${id}.basic-information`)}</h4>

            <Grid container spacing={2}>
                {(profileDetails && (
                    <ProfileForm id={id} profileDetails={profileDetails} onProfileDetailsUpdated={reloadProfileDetails} />
                )) || (
                    <FormSkeleton />
                )}

                {(profileDetails && (
                    <Websites id={id} links={profileDetails.workInfo.profileLinks} />
                )) || (
                    <TableSkeleton />
                )}
            </Grid>
        </div>
    );
};

export default BasicInformation;
