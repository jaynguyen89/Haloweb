import { IAuthenticationData } from 'src/models/Authentication';
import { IRegionalizedPhoneNumber } from 'src/models/Profile';
import IPublicData from 'src/models/PublicData';
import {
    TFormDataState, TRangeOption, TSpecialOption,
    TValidatorOption,
    TValidatorOptionsMapFn,
    ValidatorNames,
} from 'src/utilities/data-validators/dataValidators';

export enum LoginFormFieldNames {
    EmailAddress = 'EmailAddress',
    AreaCode = 'AreaCode',
    PhoneNumber = 'PhoneNumber',
    Password = 'Password',
    Trusted = 'Trusted',
}

export const initialLoginFormDataState: TFormDataState<typeof LoginFormFieldNames> = {
    [LoginFormFieldNames.EmailAddress]: {
        value: undefined,
        caption: undefined,
    },
    [LoginFormFieldNames.AreaCode]: {
        value: undefined,
    },
    [LoginFormFieldNames.PhoneNumber]: {
        value: undefined,
        caption: undefined,
    },
    [LoginFormFieldNames.Password]: {
        value: undefined,
        caption: undefined,
    },
    [LoginFormFieldNames.Trusted]: { value: false },
};

export const loginFieldValidatorMap = {
    [LoginFormFieldNames.EmailAddress]: ValidatorNames.RangeValidator,
    [LoginFormFieldNames.AreaCode]: ValidatorNames.RangeValidator,
    [LoginFormFieldNames.PhoneNumber]: ValidatorNames.RangeValidator,
    [LoginFormFieldNames.Password]: ValidatorNames.RangeValidator,
};

export type TLoginFieldKey = Omit<typeof LoginFormFieldNames, 'Trusted'>;

export const loginValidatorOptionsMapFn: TValidatorOptionsMapFn<TLoginFieldKey> =
    (publicData?: IPublicData): TValidatorOption<TLoginFieldKey> =>
({
    [LoginFormFieldNames.EmailAddress]: {
        min: 6,
        max: 100,
    } as TRangeOption,
    [LoginFormFieldNames.AreaCode]: {
        among: publicData!.countries.map(country => country.telephoneCode),
    } as TRangeOption,
    [LoginFormFieldNames.PhoneNumber]: {
        equal: 9,
        numbersOnly: true,
    } as TRangeOption,
    [LoginFormFieldNames.Password]: {
        min: 8,
        max: 24,
    } as TRangeOption,
});

export const createLoginData = (formData: TFormDataState<typeof LoginFormFieldNames>): IAuthenticationData => ({
    emailAddress: formData[LoginFormFieldNames.EmailAddress].value as string | undefined,
    phoneNumber: formData[LoginFormFieldNames.PhoneNumber].value === undefined ? undefined : {
        phoneNumber: formData[LoginFormFieldNames.PhoneNumber].value,
        regionCode: formData[LoginFormFieldNames.AreaCode].value,
    } as IRegionalizedPhoneNumber,
    password: formData[LoginFormFieldNames.Password].value,
    isTrusted: formData[LoginFormFieldNames.Trusted].value,
    deviceInformation: undefined,
});
