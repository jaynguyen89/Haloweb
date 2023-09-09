import { TRangeOption } from 'src/utilities/dataValidators';

export enum RegistrationValidatorFieldNames {
    EmailAddress = 'EmailAddress',
    AreaCode = 'AreaCode',
    PhoneNumber = 'PhoneNumber',
    Password = 'Password',
    PasswordConfirm = 'PasswordConfirm',
    Username = 'Username',
    Gender = 'Gender',
    GivenName = 'GivenName',
    MiddleName = 'MiddleName',
    FamilyName = 'FamilyName',
    FullName = 'FullName',
}

export const initialRegistrationFormDataState = {
    [RegistrationValidatorFieldNames.EmailAddress]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.AreaCode]: {
        value: undefined,
    },
    [RegistrationValidatorFieldNames.PhoneNumber]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.Password]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.PasswordConfirm]: {
        value: undefined,
    },
    [RegistrationValidatorFieldNames.Username]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.Gender]: {
        value: 4,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.GivenName]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.MiddleName]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.FamilyName]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationValidatorFieldNames.FullName]: {
        value: undefined,
        caption: undefined,
    },
};

export const validatorOptions = {
    [RegistrationValidatorFieldNames.EmailAddress]: {

    },
    [RegistrationValidatorFieldNames.AreaCode]: {

    },
    [RegistrationValidatorFieldNames.PhoneNumber]: {

    },
    [RegistrationValidatorFieldNames.Password]: {

    },
    [RegistrationValidatorFieldNames.Username]: {

    },
    [RegistrationValidatorFieldNames.Gender]: {

    },
    [RegistrationValidatorFieldNames.GivenName]: {

    },
    [RegistrationValidatorFieldNames.MiddleName]: {

    },
    [RegistrationValidatorFieldNames.FamilyName]: {

    },
    [RegistrationValidatorFieldNames.FullName]: {

    },
};
