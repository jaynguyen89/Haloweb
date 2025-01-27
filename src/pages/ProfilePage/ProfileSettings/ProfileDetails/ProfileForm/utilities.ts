import {
    TDateOption,
    TRangeOption,
    TValidatorOption,
    ValidatorNames,
} from 'src/utilities/data-validators/dataValidators';
import IPublicData from 'src/models/PublicData';
import { DateTime } from 'luxon';

export enum ProfileFormFields {
    GivenName = 'GivenName',
    MiddleName = 'MiddleName',
    FamilyName = 'FamilyName',
    FullName = 'FullName',
    Gender = 'Gender',
    NickName = 'NickName',
    DateOfBirth = 'DateOfBirth',
    Ethnicity = 'Ethnicity',
    Company = 'Company',
    OccupationId = 'OccupationId',
    JobTitle = 'JobTitle',
}

export type TProfileFormFieldKeys = typeof ProfileFormFields;

export type TProfileFormFieldValue = {
    [key in keyof TProfileFormFieldKeys]: string | number | DateTime | null;
};

export type TProfileFormFieldError = {
    [key in keyof TProfileFormFieldKeys]: string | null;
};

export const profileFormFieldValidatorMap = {
    [ProfileFormFields.GivenName]: ValidatorNames.RangeValidator,
    [ProfileFormFields.MiddleName]: ValidatorNames.RangeValidator,
    [ProfileFormFields.FamilyName]: ValidatorNames.RangeValidator,
    [ProfileFormFields.FullName]: ValidatorNames.RangeValidator,
    [ProfileFormFields.Gender]: ValidatorNames.RangeValidator,
    [ProfileFormFields.NickName]: ValidatorNames.RangeValidator,
    [ProfileFormFields.DateOfBirth]: ValidatorNames.DateValidator,
    [ProfileFormFields.Ethnicity]: ValidatorNames.RangeValidator,
    [ProfileFormFields.Company]: ValidatorNames.RangeValidator,
    [ProfileFormFields.OccupationId]: ValidatorNames.RangeValidator,
    [ProfileFormFields.JobTitle]: ValidatorNames.RangeValidator,
};

export const profileFormValidatorOptionsMapFn: TValidatorOptionsMapFn<TProfileFormFieldKeys> =
    (publicData?: IPublicData): TValidatorOption<TProfileFormFieldKeys> =>
({
    [ProfileFormFields.GivenName]: {

    } as TRangeOption,
    [ProfileFormFields.MiddleName]: {

    } as TRangeOption,
    [ProfileFormFields.FamilyName]: {

    } as TRangeOption,
    [ProfileFormFields.FullName]: {

    } as TRangeOption,
    [ProfileFormFields.Gender]: {

    } as TRangeOption,
    [ProfileFormFields.NickName]: {

    } as TRangeOption,
    [ProfileFormFields.DateOfBirth]: {

    } as TDateOption,
    [ProfileFormFields.Ethnicity]: {

    } as TRangeOption,
    [ProfileFormFields.Company]: {

    } as TRangeOption,
    [ProfileFormFields.OccupationId]: {

    } as TRangeOption,
    [ProfileFormFields.JobTitle]: {

    } as TRangeOption,
});