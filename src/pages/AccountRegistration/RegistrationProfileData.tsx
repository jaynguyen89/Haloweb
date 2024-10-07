import { FormControl, InputLabel, Select, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MessageCaption from 'src/components/atoms/MessageCaption';
import IPublicData from 'src/models/PublicData';
import { RegistrationFormFieldNames, TFieldKey } from 'src/pages/AccountRegistration/utilities';
import { TFormDataState } from 'src/utilities/data-validators/dataValidators';
import { TValidationResult } from 'src/utilities/data-validators/fieldsMediator';

interface IRegistrationProfileData {
    publicData: IPublicData,
    formData: TFormDataState<typeof RegistrationFormFieldNames>,
    handleFieldValueChange: (fieldName: keyof typeof RegistrationFormFieldNames, value: string | undefined) => void,
    fieldValidation: TValidationResult<TFieldKey>,
}

const RegistrationProfileData = ({
    publicData,
    formData,
    handleFieldValueChange,
    fieldValidation,
}: IRegistrationProfileData) => {
    const { t } = useTranslation();

    return (
        <>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel
                        id='area-code-select-label'>{t('registration-page.gender-label')}</InputLabel>
                    <Select
                        labelId='area-code-select-label'
                        label={t('registration-page.gender-label')}
                        value={formData[RegistrationFormFieldNames.Gender].value ?? ''}
                        onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.Gender, e.target.value as string)}
                        variant='outlined'
                    >
                        {publicData.genders.map(gender => (
                            <MenuItem key={gender.index} value={gender.index}>{gender.display}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
                <TextField
                    label={t('registration-page.given-name-label')}
                    style={{width: '100%'}}
                    value={formData[RegistrationFormFieldNames.GivenName].value}
                    onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.GivenName, e.target.value)}
                />
                {
                    fieldValidation && fieldValidation[RegistrationFormFieldNames.GivenName].isValid !== undefined &&
                    !fieldValidation[RegistrationFormFieldNames.GivenName].isValid && (
                        <MessageCaption
                            statuses={fieldValidation[RegistrationFormFieldNames.GivenName].messages as Map<string, object | undefined>}
                        />
                    )}
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
                <TextField
                    label={t('registration-page.middle-name-label')}
                    style={{width: '100%'}}
                    value={formData[RegistrationFormFieldNames.MiddleName].value}
                    onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.MiddleName, e.target.value)}
                />
                {
                    fieldValidation && fieldValidation[RegistrationFormFieldNames.MiddleName].isValid !== undefined &&
                    !fieldValidation[RegistrationFormFieldNames.MiddleName].isValid && (
                        <MessageCaption
                            statuses={fieldValidation[RegistrationFormFieldNames.MiddleName].messages as Map<string, object | undefined>}
                        />
                    )}
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
                <TextField
                    label={t('registration-page.family-name-label')}
                    style={{width: '100%'}}
                    value={formData[RegistrationFormFieldNames.FamilyName].value}
                    onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.FamilyName, e.target.value)}
                />
                {
                    fieldValidation && fieldValidation[RegistrationFormFieldNames.FamilyName].isValid !== undefined &&
                    !fieldValidation[RegistrationFormFieldNames.FamilyName].isValid && (
                        <MessageCaption
                            statuses={fieldValidation[RegistrationFormFieldNames.FamilyName].messages as Map<string, object | undefined>}
                        />
                    )}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label={t('registration-page.full-name-label')}
                    style={{width: '100%'}}
                    value={formData[RegistrationFormFieldNames.FullName].value}
                    onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.FullName, e.target.value)}
                />
                {
                    fieldValidation && fieldValidation[RegistrationFormFieldNames.FullName].isValid !== undefined &&
                    !fieldValidation[RegistrationFormFieldNames.FullName].isValid && (
                        <MessageCaption
                            statuses={fieldValidation[RegistrationFormFieldNames.FullName].messages as Map<string, object | undefined>}
                        />
                    )}
            </Grid>
        </>
    );
};

export default RegistrationProfileData;
