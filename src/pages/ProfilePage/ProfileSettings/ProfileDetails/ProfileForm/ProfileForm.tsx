import React from 'react';
import Grid from '@mui/material/Grid';
import SavableInput from 'src/components/molecules/SavableInput/SavableInput';
import SavableSelect from 'src/components/molecules/SavableSelect/SavableSelect';
import MenuItem from '@mui/material/MenuItem';
import { IProfileDetails } from 'src/models/Profile';
import { useTranslation } from 'react-i18next';
import { TRootState } from 'src/redux/reducers';
import { usePublicData } from 'src/hooks/usePublicData';
import SavableCalendar from 'src/components/molecules/SavableCalendar/SavableCalendar';
import { useOccupationItems } from 'src/hooks/useOccupation';
import { toOccupationItemsGroup } from 'src/models/Occupation';
import FaIcon from 'src/components/atoms/FaIcon';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

type TProfileFormProps = {
    id: string,
    profileDetails: IProfileDetails,
};

const mapStateToProps = (state: TRootState) => ({

});

const ProfileForm = ({
    id,
    profileDetails,
}: ReturnType<typeof mapStateToProps> & TProfileFormProps) => {
    const { t } = useTranslation();
    const genders = usePublicData('genders');
    const ethnicities = usePublicData('ethnicities');
    const occupations = useOccupationItems();

    const occupationGroups = Boolean(occupations) ? toOccupationItemsGroup(occupations) : [];

    return (
        <>
            <Grid item md={4} sm={12}>
                <SavableInput
                    label={t(`profile-page.${id}.given-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.givenName}
                    value={profileDetails.givenName}
                />
            </Grid>
            <Grid item md={4} sm={12}>
                <SavableInput
                    label={t(`profile-page.${id}.middle-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.middleName}
                    value={profileDetails.middleName}
                />
            </Grid>
            <Grid item md={4} sm={12}>
                <SavableInput
                    label={t(`profile-page.${id}.family-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.familyName}
                    value={profileDetails.familyName}
                />
            </Grid>
            <Grid item md={8} sm={6} xs={12}>
                <SavableInput
                    label={t(`profile-page.${id}.full-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.fullName}
                    value={profileDetails.fullName}
                />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <SavableSelect
                    id='gender-select-label'
                    label={t(`profile-page.${id}.gender-label`)}
                    variant='outlined'
                    oldValue={profileDetails.gender}
                    value={profileDetails.gender ?? 0}
                >
                    {(genders ?? []).map((gender, i) => (
                        <MenuItem key={`${i}_${gender.index}`} value={`${gender.index}`}>
                            {gender.display}
                        </MenuItem>
                    ))}
                </SavableSelect>
            </Grid>
            <Grid item lg={4} md={6} sm={12}>
                <SavableInput
                    label={t(`profile-page.${id}.preferred-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.nickName}
                    value={profileDetails.nickName}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={12}>
                <SavableCalendar
                    label={t(`profile-page.${id}.dob-label`)}
                    oldValue={profileDetails.dateOfBirth}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={12}>
                <SavableSelect
                    id='ethnicity-select-label'
                    label={t(`profile-page.${id}.ethnicity-label`)}
                    variant='outlined'
                    oldValue={profileDetails.ethnicity}
                    value={profileDetails.ethnicity ?? 0}
                >
                    {(ethnicities ?? []).map((ethnicity, i) => (
                        <MenuItem key={`${i}_${ethnicity.index}`} value={`${ethnicity.index}`}>
                            {ethnicity.display}
                        </MenuItem>
                    ))}
                </SavableSelect>
            </Grid>
            <Grid item lg={4} md={6} sm={12}>
                <SavableInput
                    label={t(`profile-page.${id}.company-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.workInfo.company}
                    value={profileDetails.workInfo.company}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={12}>
                <SavableSelect
                    native
                    id='occupation-select-label'
                    label={t(`profile-page.${id}.occupation-label`)}
                    variant='outlined'
                    oldValue={profileDetails.workInfo.occupationId}
                    value={profileDetails.workInfo.occupationId}
                >
                    <option key={0} value={null}>
                        <FaIcon wrapper='fa' t='obj' ic={faMinus} />
                    </option>
                    {occupationGroups.map(group => (
                        <optgroup key={group.id} label={group.name}>
                            {group.items.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </optgroup>
                    ))}
                </SavableSelect>
            </Grid>
            <Grid item lg={4} md={6} sm={12}>
                <SavableInput
                    label={t(`profile-page.${id}.job-title-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.workInfo.jobTitle}
                    value={profileDetails.workInfo.jobTitle}
                />
            </Grid>
        </>
    );
};

export default ProfileForm;