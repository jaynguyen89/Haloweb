import IPublicData from 'src/models/PublicData';
import {
    TFormDataState,
    TRangeOption,
    TSpecialOption,
    TValidatorOption,
    TValidatorOptionsMapFn,
    ValidatorNames,
} from 'src/utilities/dataValidators';

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

export const initialRegistrationFormDataState: TFormDataState<typeof RegistrationValidatorFieldNames> = {
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
        value: '4',
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

export type TFieldKey = Omit<typeof RegistrationValidatorFieldNames, 'PasswordConfirm'>;

export const fieldValidatorNameMap = {
    [RegistrationValidatorFieldNames.EmailAddress]: ValidatorNames.EmailValidator,
    [RegistrationValidatorFieldNames.AreaCode]: ValidatorNames.LengthValidator,
    [RegistrationValidatorFieldNames.PhoneNumber]: ValidatorNames.LengthValidator,
    [RegistrationValidatorFieldNames.Password]: ValidatorNames.SpecialValidator,
    [RegistrationValidatorFieldNames.Username]: ValidatorNames.SpecialValidator,
    [RegistrationValidatorFieldNames.Gender]: ValidatorNames.LengthValidator,
    [RegistrationValidatorFieldNames.GivenName]: ValidatorNames.SpecialValidator,
    [RegistrationValidatorFieldNames.MiddleName]: ValidatorNames.SpecialValidator,
    [RegistrationValidatorFieldNames.FamilyName]: ValidatorNames.SpecialValidator,
    [RegistrationValidatorFieldNames.FullName]: ValidatorNames.SpecialValidator,
};

export const validatorOptionsMapFn: TValidatorOptionsMapFn<TFieldKey> = (publicData: IPublicData): TValidatorOption<TFieldKey> => ({
    [RegistrationValidatorFieldNames.EmailAddress]: {
        captionKey: RegistrationValidatorFieldNames.EmailAddress,
        min: 6,
        max: 100,
    } as TRangeOption,
    [RegistrationValidatorFieldNames.AreaCode]: {
        captionKey: RegistrationValidatorFieldNames.AreaCode,
        among: publicData.countries.map(country => country.telephoneCode),
    } as TRangeOption,
    [RegistrationValidatorFieldNames.PhoneNumber]: {
        captionKey: RegistrationValidatorFieldNames.PhoneNumber,
        length: 9,
        numbersOnly: true,
    } as TRangeOption,
    [RegistrationValidatorFieldNames.Password]: {
        captionKey: RegistrationValidatorFieldNames.Password,
        min: 8,
        max: 24,
        includeLowercaseChar: true,
        includeUppercaseChar: true,
        includeNumber: true,
        includeSpecialChar: true,
        specialCharsToInclude: '!@#$%^&*()_-+={[}]:;<,>.?|~`\\/\'"',
    } as TRangeOption & TSpecialOption,
    [RegistrationValidatorFieldNames.Username]: {
        captionKey: RegistrationValidatorFieldNames.Username,
        min: 6,
        max: 65,
        specialCharsToInclude: '\'.-_!@#*=+[]():<>~',
    } as TRangeOption & TSpecialOption,
    [RegistrationValidatorFieldNames.Gender]: {
        captionKey: RegistrationValidatorFieldNames.Gender,
        among: publicData.genders.map(gender => gender.index),
    } as TRangeOption,
    [RegistrationValidatorFieldNames.GivenName]: {
        captionKey: RegistrationValidatorFieldNames.GivenName,
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
    } as TRangeOption & TSpecialOption,
    [RegistrationValidatorFieldNames.MiddleName]: {
        captionKey: RegistrationValidatorFieldNames.MiddleName,
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
    } as TRangeOption & TSpecialOption,
    [RegistrationValidatorFieldNames.FamilyName]: {
        captionKey: RegistrationValidatorFieldNames.FullName,
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
    } as TRangeOption & TSpecialOption,
    [RegistrationValidatorFieldNames.FullName]: {
        captionKey: RegistrationValidatorFieldNames.FamilyName,
        min: 1,
        max: 65,
        specialCharsToInclude: '\'.-',
    } as TRangeOption & TSpecialOption,
});
