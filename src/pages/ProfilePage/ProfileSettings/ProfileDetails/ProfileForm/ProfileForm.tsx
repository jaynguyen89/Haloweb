import React, { useState } from 'react';
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
import {
    ProfileFormFields, TProfileFormFieldError,
    TProfileFormFieldValue,
} from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileForm/utilities';

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

    const [fieldValues, setFieldValues] = useState<TProfileFormFieldValue>({
        [ProfileFormFields.GivenName]: profileDetails.givenName,
        [ProfileFormFields.MiddleName]: profileDetails.middleName,
        [ProfileFormFields.FamilyName]: profileDetails.familyName,
        [ProfileFormFields.FullName]: profileDetails.fullName,
        [ProfileFormFields.Gender]: profileDetails.gender,
        [ProfileFormFields.NickName]: profileDetails.nickName,
        [ProfileFormFields.DateOfBirth]: profileDetails.dateOfBirth,
        [ProfileFormFields.Ethnicity]: profileDetails.ethnicity,
        [ProfileFormFields.Company]: profileDetails.workInfo.company,
        [ProfileFormFields.OccupationId]: profileDetails.workInfo.occupationId,
        [ProfileFormFields.JobTitle]: profileDetails.workInfo.jobTitle,
    });

    const [fieldError, setFieldError] = useState<TProfileFormFieldError>({
        [ProfileFormFields.GivenName]: null,
        [ProfileFormFields.MiddleName]: null,
        [ProfileFormFields.FamilyName]: null,
        [ProfileFormFields.FullName]: null,
        [ProfileFormFields.Gender]: null,
        [ProfileFormFields.NickName]: null,
        [ProfileFormFields.DateOfBirth]: null,
        [ProfileFormFields.Ethnicity]: null,
        [ProfileFormFields.Company]: null,
        [ProfileFormFields.OccupationId]: null,
        [ProfileFormFields.JobTitle]: null,
    });

    const handleFieldChange = (value: string | number) => {

    };

    return (
        <>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <SavableInput
                    label={t(`profile-page.${id}.given-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.givenName}
                    value={fieldValues[ProfileFormFields.GivenName]}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <SavableInput
                    label={t(`profile-page.${id}.middle-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.middleName}
                    value={fieldValues[ProfileFormFields.MiddleName]}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <SavableInput
                    label={t(`profile-page.${id}.family-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.familyName}
                    value={fieldValues[ProfileFormFields.FamilyName]}
                />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={7}>
                <SavableInput
                    label={t(`profile-page.${id}.full-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.fullName}
                    value={fieldValues[ProfileFormFields.FullName]}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={5}>
                <SavableSelect
                    id='gender-select-label'
                    label={t(`profile-page.${id}.gender-label`)}
                    variant='outlined'
                    oldValue={profileDetails.gender}
                    value={fieldValues[ProfileFormFields.Gender]}
                >
                    {(genders ?? []).map((gender, i) => (
                        <MenuItem key={`${i}_${gender.index}`} value={`${gender.index}`}>
                            {gender.display}
                        </MenuItem>
                    ))}
                </SavableSelect>
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableInput
                    label={t(`profile-page.${id}.preferred-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.nickName}
                    value={fieldValues[ProfileFormFields.NickName]}
                />
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableCalendar
                    label={t(`profile-page.${id}.dob-label`)}
                    oldValue={profileDetails.dateOfBirth}
                />
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableSelect
                    id='ethnicity-select-label'
                    label={t(`profile-page.${id}.ethnicity-label`)}
                    variant='outlined'
                    oldValue={profileDetails.ethnicity}
                    value={fieldValues[ProfileFormFields.Ethnicity]}
                >
                    {(ethnicities ?? []).map((ethnicity, i) => (
                        <MenuItem key={`${i}_${ethnicity.index}`} value={`${ethnicity.index}`}>
                            {ethnicity.display}
                        </MenuItem>
                    ))}
                </SavableSelect>
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableInput
                    label={t(`profile-page.${id}.company-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.workInfo.company}
                    value={fieldValues[ProfileFormFields.Company]}
                />
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableSelect
                    native
                    id='occupation-select-label'
                    label={t(`profile-page.${id}.occupation-label`)}
                    variant='outlined'
                    oldValue={profileDetails.workInfo.occupationId}
                    value={fieldValues[ProfileFormFields.OccupationId]}
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
            <Grid item md={6} sm={12} xs={6}>
                <SavableInput
                    label={t(`profile-page.${id}.job-title-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.workInfo.jobTitle}
                    value={fieldValues[ProfileFormFields.JobTitle]}
                />
            </Grid>
        </>
    );
};

export default ProfileForm;