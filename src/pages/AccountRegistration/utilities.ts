import { IRegistrationData } from 'src/models/Authentication';
import { IRegionalizedPhoneNumber, IRegistrationProfileData } from 'src/models/Profile';
import IPublicData from 'src/models/PublicData';
import {
    TFormDataState,
    TRangeOption,
    TSpecialOption,
    TValidatorOption,
    TValidatorOptionsMapFn,
    ValidatorNames,
} from 'src/utilities/data-validators/dataValidators';

export enum RegistrationFormFieldNames {
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

export const initialRegistrationFormDataState: TFormDataState<typeof RegistrationFormFieldNames> = {
    [RegistrationFormFieldNames.EmailAddress]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationFormFieldNames.AreaCode]: {
        value: undefined,
    },
    [RegistrationFormFieldNames.PhoneNumber]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationFormFieldNames.Password]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationFormFieldNames.PasswordConfirm]: {
        value: undefined,
    },
    [RegistrationFormFieldNames.Username]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationFormFieldNames.Gender]: {
        value: '0',
        caption: undefined,
    },
    [RegistrationFormFieldNames.GivenName]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationFormFieldNames.MiddleName]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationFormFieldNames.FamilyName]: {
        value: undefined,
        caption: undefined,
    },
    [RegistrationFormFieldNames.FullName]: {
        value: undefined,
        caption: undefined,
    },
};

export type TRegistrationFieldKey = Omit<typeof RegistrationFormFieldNames, 'PasswordConfirm'>;

export const registrationFieldValidatorMap = {
    [RegistrationFormFieldNames.EmailAddress]: ValidatorNames.EmailValidator,
    [RegistrationFormFieldNames.AreaCode]: ValidatorNames.RangeValidator,
    [RegistrationFormFieldNames.PhoneNumber]: ValidatorNames.RangeValidator,
    [RegistrationFormFieldNames.Password]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.Username]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.Gender]: ValidatorNames.RangeValidator,
    [RegistrationFormFieldNames.GivenName]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.MiddleName]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.FamilyName]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.FullName]: ValidatorNames.SpecialValidator,
};

export const registrationValidatorOptionsMapFn: TValidatorOptionsMapFn<TRegistrationFieldKey> =
    (publicData?: IPublicData): TValidatorOption<TRegistrationFieldKey> =>
({
    [RegistrationFormFieldNames.EmailAddress]: {
        min: 6,
        max: 100,
    } as TRangeOption,
    [RegistrationFormFieldNames.AreaCode]: {
        among: publicData!.countries.map(country => country.telephoneCode),
    } as TRangeOption,
    [RegistrationFormFieldNames.PhoneNumber]: {
        equal: 9,
        numbersOnly: true,
    } as TRangeOption,
    [RegistrationFormFieldNames.Password]: {
        min: 8,
        max: 24,
        isPassword: true,
        withLowercaseChar: true,
        withUppercaseChar: true,
        withNumber: true,
        withSpecialChar: true,
        specialCharsToInclude: '!@#$%^&*()_-+={[}]:;<,>.?|~`\\/\'"',
    } as TSpecialOption,
    [RegistrationFormFieldNames.Username]: {
        min: 6,
        max: 65,
        specialCharsToInclude: '\'.-_!@#*=+:<>~',
    } as TSpecialOption,
    [RegistrationFormFieldNames.Gender]: {
        among: publicData!.genders.map(gender => `${gender.index}`),
    } as TRangeOption,
    [RegistrationFormFieldNames.GivenName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        withSpace: true,
    } as TSpecialOption,
    [RegistrationFormFieldNames.MiddleName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        withSpace: true,
    } as TSpecialOption,
    [RegistrationFormFieldNames.FamilyName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        withSpace: true,
    } as TSpecialOption,
    [RegistrationFormFieldNames.FullName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        withSpace: true,
    } as TSpecialOption,
});

const createRegistrationProfileData = (formData: TFormDataState<typeof RegistrationFormFieldNames>): IRegistrationProfileData | undefined => {
    if (
        formData[RegistrationFormFieldNames.Gender].value ||
        formData[RegistrationFormFieldNames.GivenName].value ||
        formData[RegistrationFormFieldNames.MiddleName].value ||
        formData[RegistrationFormFieldNames.FamilyName].value ||
        formData[RegistrationFormFieldNames.FullName].value
    ) return {
        gender: formData[RegistrationFormFieldNames.Gender].value ? +formData[RegistrationFormFieldNames.Gender].value : undefined,
        givenName: formData[RegistrationFormFieldNames.GivenName].value as string | undefined,
        middleName: formData[RegistrationFormFieldNames.MiddleName].value as string | undefined,
        familyName: formData[RegistrationFormFieldNames.FamilyName].value as string | undefined,
        fullName: formData[RegistrationFormFieldNames.FullName].value as string | undefined,
    };

    return undefined;
};

export const createRegistrationData = (formData: TFormDataState<typeof RegistrationFormFieldNames>): IRegistrationData => ({
    emailAddress: formData[RegistrationFormFieldNames.EmailAddress].value as string | undefined,
    phoneNumber: formData[RegistrationFormFieldNames.PhoneNumber].value === undefined ? undefined : {
        phoneNumber: formData[RegistrationFormFieldNames.PhoneNumber].value,
        regionCode: formData[RegistrationFormFieldNames.AreaCode].value,
    } as IRegionalizedPhoneNumber,
    username: formData[RegistrationFormFieldNames.Username].value as string,
    password: formData[RegistrationFormFieldNames.Password].value as string,
    passwordConfirm: formData[RegistrationFormFieldNames.PasswordConfirm].value as string,
    profileData: createRegistrationProfileData(formData),
});
