import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import SavableInput from 'src/components/molecules/SavableInput/SavableInput';
import SavableSelect from 'src/components/molecules/SavableSelect/SavableSelect';
import MenuItem from '@mui/material/MenuItem';
import { IProfileDetails, IProfileUpdateData } from 'src/models/Profile';
import { useTranslation } from 'react-i18next';
import { TRootState } from 'src/redux/reducers';
import SavableCalendar from 'src/components/molecules/SavableCalendar/SavableCalendar';
import { useOccupationItems } from 'src/hooks/useOccupation';
import { toOccupationItemsGroup } from 'src/models/Occupation';
import FaIcon from 'src/components/atoms/FaIcon';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import {
    ProfileFormFields,
    TProfileFormFieldKeys,
    profileFormValidatorOptionsMapFn,
    profileFormFieldValidatorMap,
    getProfileFormData,
    TProfileFormStatus,
    defaultProfileFormStatus,
} from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileInformation/ProfileForm/utilities';
import { useDebounce } from 'src/hooks/eventForger';
import configs from 'src/commons/configs';
import {
    mapFieldsToValidators,
    TFieldToValidatorMap,
    TFormDataState,
} from 'src/utilities/data-validators/dataValidators';
import { batch, connect, useDispatch } from 'react-redux';
import { DateFormats } from 'src/commons/enums';
import MessageCaption from 'src/components/atoms/MessageCaption';
import { sendRequestToUpdateProfileDetails } from 'src/redux/actions/profileActions';
import useAuthorization from 'src/hooks/useAuthorization';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import { useTheme } from '@mui/material';
import { DateTime } from 'luxon';

type TProfileFormProps = {
    id: string,
    profileDetails: IProfileDetails,
    onProfileDetailsUpdated: () => void,
};

const mapStateToProps = (state: TRootState) => ({
    publicData: state.publicDataStore.publicData,
});

const ProfileForm = ({
    id,
    profileDetails,
    publicData,
    onProfileDetailsUpdated,
}: ReturnType<typeof mapStateToProps> & TProfileFormProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { authorization, profileId } = useAuthorization();
    const occupations = useOccupationItems();

    const occupationGroups = Boolean(occupations) ? toOccupationItemsGroup(occupations) : [];
    const [fieldValues, setFieldValues] = useState<TFormDataState<TProfileFormFieldKeys>>(getProfileFormData(profileDetails));
    const [updatedField, setUpdatedField] = useState<string | null>(null);

    const [result, setResult] = useState<true | string | undefined>(undefined);
    const isSaving = useIsStageIncluded(Stages.REQUEST_TO_UPDATE_PROFILE_INFO_BEGIN);
    const [status, setStatus] = useState<TProfileFormStatus>(defaultProfileFormStatus);

    useEffect(() => {
        setFieldValues(getProfileFormData(profileDetails));
    }, [profileDetails]);

    const validators: TFieldToValidatorMap<TProfileFormFieldKeys> = useMemo(() => {
        const tempValidators: TFieldToValidatorMap<TProfileFormFieldKeys> = {};

        Object.values(ProfileFormFields)
            .forEach(field => tempValidators[field as keyof TProfileFormFieldKeys] = mapFieldsToValidators(
                fieldValues,
                publicData,
                profileFormValidatorOptionsMapFn,
                field as keyof TProfileFormFieldKeys,
                profileFormFieldValidatorMap[field as keyof TProfileFormFieldKeys],
                {dateOnly: true, formats: { date: DateFormats.DDMMYYYYS }},
                occupations.map(x => x.id),
            ));

        return tempValidators;
    }, [fieldValues]);

    const validateFieldValueWithDebounce = useDebounce(() => {
        const validator = validators[updatedField];
        const result = validator.validate();

        if (!result.isValid) {
            const message = t(result.messages.entries().next().value[0], result.messages.entries().next().value[1]);
            setFieldValues({
                ...fieldValues,
                [updatedField]: {...fieldValues[updatedField], caption: message},
            });
        }
    }, [configs.debounceWaitDuration]);

    const handleFieldChange = (key: keyof TProfileFormFieldKeys, value: string | number) => {
        batch(() => {
            setFieldValues({ ...getProfileFormData(profileDetails), [key]: { value } });
            setUpdatedField(key);
            setResult(undefined);
        });
    };

    useEffect(() => {
        if (updatedField && fieldValues[updatedField].value) validateFieldValueWithDebounce(updatedField);
    }, [updatedField, fieldValues]);

    const updateProfile = useCallback(async () => {
        const data: IProfileUpdateData = {
            fieldName: updatedField,
            strValue: `${fieldValues[updatedField].value}`,
            intValue: +fieldValues[updatedField].value,
        };

        const result = await sendRequestToUpdateProfileDetails(dispatch, authorization, profileId, data);
        setResult(result);
    }, [authorization, profileId, updatedField, fieldValues]);

    useEffect(() => {
        if (result === true) onProfileDetailsUpdated();
    }, [result]);

    useEffect(() => {
        const status = {
            [updatedField]: result !== undefined ? {
                isSaving,
                success:  typeof result !== 'string',
            } : undefined,
        };

        setStatus({...defaultProfileFormStatus, ...status});
    }, [isSaving, result, updatedField]);

    return (
        <>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <SavableInput
                    label={t(`profile-page.${id}.given-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.givenName ?? ''}
                    value={fieldValues[ProfileFormFields.GivenName].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.GivenName, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.GivenName].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.GivenName]}
                />
                {fieldValues[ProfileFormFields.GivenName].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.GivenName].caption} />
                )}
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <SavableInput
                    label={t(`profile-page.${id}.middle-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.middleName ?? ''}
                    value={fieldValues[ProfileFormFields.MiddleName].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.MiddleName, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.MiddleName].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.MiddleName]}
                />
                {fieldValues[ProfileFormFields.MiddleName].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.MiddleName].caption} />
                )}
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <SavableInput
                    label={t(`profile-page.${id}.family-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.lastName ?? ''}
                    value={fieldValues[ProfileFormFields.FamilyName].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.FamilyName, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.FamilyName].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.FamilyName]}
                />
                {fieldValues[ProfileFormFields.FamilyName].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.FamilyName].caption} />
                )}
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={7}>
                <SavableInput
                    label={t(`profile-page.${id}.full-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.fullName ?? ''}
                    value={fieldValues[ProfileFormFields.FullName].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.FullName, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.FullName].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.FullName]}
                />
                {fieldValues[ProfileFormFields.FullName].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.FullName].caption} />
                )}
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={5}>
                <SavableSelect
                    id='gender-select-label'
                    label={t(`profile-page.${id}.gender-label`)}
                    variant='outlined'
                    oldValue={profileDetails.gender}
                    value={fieldValues[ProfileFormFields.Gender].value}
                    onChange={(e) => handleFieldChange(ProfileFormFields.Gender, +e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.Gender].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.Gender]}
                >
                    {(publicData?.genders ?? []).map((gender, i) => (
                        <MenuItem key={`${i}_${gender.index}`} value={`${gender.index}`}>
                            {gender.display}
                        </MenuItem>
                    ))}
                </SavableSelect>
                {fieldValues[ProfileFormFields.Gender].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.Gender].caption} />
                )}
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableInput
                    label={t(`profile-page.${id}.preferred-name-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.nickName ?? ''}
                    value={fieldValues[ProfileFormFields.NickName].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.NickName, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.NickName].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.NickName]}
                />
                {fieldValues[ProfileFormFields.NickName].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.NickName].caption} />
                )}
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableCalendar
                    label={t(`profile-page.${id}.dob-label`)}
                    oldValue={profileDetails.dateOfBirth}
                    defaultValue={DateTime.fromISO(fieldValues[ProfileFormFields.DateOfBirth].value)}
                    onDatePicked={(val) => handleFieldChange(ProfileFormFields.DateOfBirth, val)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.DateOfBirth].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.DateOfBirth]}
                />
                {fieldValues[ProfileFormFields.DateOfBirth].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.DateOfBirth].caption} />
                )}
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableSelect
                    id='ethnicity-select-label'
                    label={t(`profile-page.${id}.ethnicity-label`)}
                    variant='outlined'
                    oldValue={profileDetails.ethnicity}
                    value={fieldValues[ProfileFormFields.Ethnicity].value}
                    onChange={(e) => handleFieldChange(ProfileFormFields.Ethnicity, +e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.Ethnicity].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.Ethnicity]}
                >
                    {(publicData?.ethnicities ?? []).map((ethnicity, i) => (
                        <MenuItem key={`${i}_${ethnicity.index}`} value={`${ethnicity.index}`}>
                            {ethnicity.display}
                        </MenuItem>
                    ))}
                </SavableSelect>
                {fieldValues[ProfileFormFields.Ethnicity].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.Ethnicity].caption} />
                )}
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableInput
                    label={t(`profile-page.${id}.company-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.workInfo.company ?? ''}
                    value={fieldValues[ProfileFormFields.Company].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.Company, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.Company].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.Company]}
                />
                {fieldValues[ProfileFormFields.Company].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.Company].caption} />
                )}
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableSelect
                    native
                    id='occupation-select-label'
                    label={t(`profile-page.${id}.occupation-label`)}
                    variant='outlined'
                    oldValue={profileDetails.workInfo.occupationId ?? ''}
                    value={fieldValues[ProfileFormFields.OccupationId].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.OccupationId, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.OccupationId].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.OccupationId]}
                >
                    <option key={0} value=''>
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
                {fieldValues[ProfileFormFields.OccupationId].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.OccupationId].caption} />
                )}
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
                <SavableInput
                    label={t(`profile-page.${id}.job-title-label`)}
                    style={{width: '100%'}}
                    oldValue={profileDetails.workInfo.jobTitle ?? ''}
                    value={fieldValues[ProfileFormFields.JobTitle].value ?? ''}
                    onChange={(e) => handleFieldChange(ProfileFormFields.JobTitle, e.target.value)}
                    disableSaveBtn={Boolean(fieldValues[ProfileFormFields.JobTitle].caption)}
                    onClickSaveBtn={updateProfile}
                    status={status[ProfileFormFields.JobTitle]}
                />
                {fieldValues[ProfileFormFields.JobTitle].caption && (
                    <MessageCaption message={fieldValues[ProfileFormFields.JobTitle].caption} />
                )}
            </Grid>
        </>
    );
};

export default connect(mapStateToProps)(ProfileForm);