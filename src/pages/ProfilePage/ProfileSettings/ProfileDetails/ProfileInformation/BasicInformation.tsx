import React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { IProfileDetails } from 'src/models/Profile';
import Websites from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileInformation/Websites/Websites';
import FormSkeleton from 'src/components/atoms/Skeletons/FormSkeleton';
import TableSkeleton from 'src/components/atoms/Skeletons/TableSkeleton';
import ProfileForm from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileInformation/ProfileForm/ProfileForm';

type TBasicInfoProps = {
    id: string,
    profileDetails: IProfileDetails,
    reloadProfileDetails: () => void,
};

const BasicInformation = ({
    id,
    profileDetails,
    reloadProfileDetails,
}: TBasicInfoProps) => {
    const { t } = useTranslation();

    return (
        <div className='profile-form'>
            <h4>{t(`profile-page.${id}.basic-information`)}</h4>

            <Grid container spacing={2}>
                {(profileDetails && (
                    <ProfileForm id={id} profileDetails={profileDetails} onProfileDetailsUpdated={reloadProfileDetails} />
                )) || (
                    <FormSkeleton />
                )}

                {(profileDetails && (
                    <Websites id={id} links={profileDetails.workInfo.profileLinks} onLinksChanged={reloadProfileDetails} />
                )) || (
                    <TableSkeleton />
                )}
            </Grid>
        </div>
    );
};

export default BasicInformation;