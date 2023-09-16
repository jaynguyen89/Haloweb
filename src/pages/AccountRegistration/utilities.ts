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

export type TFieldKey = Omit<typeof RegistrationFormFieldNames, 'PasswordConfirm'>;

export const fieldValidatorNameMap = {
    [RegistrationFormFieldNames.EmailAddress]: ValidatorNames.EmailValidator,
    [RegistrationFormFieldNames.AreaCode]: ValidatorNames.LengthValidator,
    [RegistrationFormFieldNames.PhoneNumber]: ValidatorNames.LengthValidator,
    [RegistrationFormFieldNames.Password]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.Username]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.Gender]: ValidatorNames.LengthValidator,
    [RegistrationFormFieldNames.GivenName]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.MiddleName]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.FamilyName]: ValidatorNames.SpecialValidator,
    [RegistrationFormFieldNames.FullName]: ValidatorNames.SpecialValidator,
};

export const validatorOptionsMapFn: TValidatorOptionsMapFn<TFieldKey> = (publicData?: IPublicData): TValidatorOption<TFieldKey> => ({
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
        includeLowercaseChar: true,
        includeUppercaseChar: true,
        includeNumber: true,
        includeSpecialChar: true,
        specialCharsToInclude: '!@#$%^&*()_-+={[}]:;<,>.?|~`\\/\'"',
    } as TRangeOption & TSpecialOption,
    [RegistrationFormFieldNames.Username]: {
        min: 6,
        max: 65,
        specialCharsToInclude: '\'.-_!@#*=+:<>~',
    } as TRangeOption & TSpecialOption,
    [RegistrationFormFieldNames.Gender]: {
        among: publicData!.genders.map(gender => `${gender.index}`),
    } as TRangeOption,
    [RegistrationFormFieldNames.GivenName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        allowSpace: true,
    } as TRangeOption & TSpecialOption,
    [RegistrationFormFieldNames.MiddleName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        allowSpace: true,
    } as TRangeOption & TSpecialOption,
    [RegistrationFormFieldNames.FamilyName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        allowSpace: true,
    } as TRangeOption & TSpecialOption,
    [RegistrationFormFieldNames.FullName]: {
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
        allowSpace: true,
    } as TRangeOption & TSpecialOption,
});
