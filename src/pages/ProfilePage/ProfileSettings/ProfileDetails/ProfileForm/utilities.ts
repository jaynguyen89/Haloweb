import {
    TDateOption, TFormDataState,
    TRangeOption,
    TValidatorOption,
    TValidatorOptionsMapFn,
    ValidatorNames,
} from 'src/utilities/data-validators/dataValidators';
import IPublicData from 'src/models/PublicData';
import { DateTime } from 'luxon';
import { Ethnicity, Gender } from 'src/models/enums/apiEnums';
import configs from 'src/commons/configs';
import { IProfileDetails } from 'src/models/Profile';

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
    (
        publicData?: IPublicData,
        extra?: unknown,
    ): TValidatorOption<TProfileFormFieldKeys> =>
({
    [ProfileFormFields.GivenName]: {
        min: 1,
        max: 65,
        pattern: '\'.- ',
    } as TRangeOption,
    [ProfileFormFields.MiddleName]: {
        min: 1,
        max: 65,
        pattern: '\'.- ',
    } as TRangeOption,
    [ProfileFormFields.FamilyName]: {
        min: 1,
        max: 65,
        pattern: '\'.- ',
    } as TRangeOption,
    [ProfileFormFields.FullName]: {
        min: 1,
        max: 65,
        pattern: '\'.- ',
    } as TRangeOption,
    [ProfileFormFields.Gender]: {
        min: 0,
        max: Object.keys(Gender).length - 1,
    } as TRangeOption,
    [ProfileFormFields.NickName]: {
        min: 1,
        max: 65,
        pattern: '\'.- ',
    } as TRangeOption,
    [ProfileFormFields.DateOfBirth]: {
        beforeDate: DateTime.now().minus({ year: configs.minAge }),
        afterDate: DateTime.now().minus({ year: configs.maxAge }),
    } as TDateOption,
    [ProfileFormFields.Ethnicity]: {
        min: 0,
        max: Object.keys(Ethnicity).length - 1,
    } as TRangeOption,
    [ProfileFormFields.Company]: {
        min: 1,
        max: 65,
        pattern: '_\'.- ',
    } as TRangeOption,
    [ProfileFormFields.OccupationId]: {
        among: extra as Array<string>,
    } as TRangeOption,
    [ProfileFormFields.JobTitle]: {
        min: 1,
        max: 65,
        pattern: '_\'.- ',
    } as TRangeOption,
});

export const getProfileFormData: TFormDataState<TProfileFormFieldKeys> = (profileDetails: IProfileDetails) => ({
    [ProfileFormFields.GivenName]: {
        value: profileDetails.givenName,
    },
    [ProfileFormFields.MiddleName]: {
        value: profileDetails.middleName,
    },
    [ProfileFormFields.FamilyName]: {
        value: profileDetails.familyName,
    },
    [ProfileFormFields.FullName]: {
        value: profileDetails.fullName,
    },
    [ProfileFormFields.Gender]: {
        value: profileDetails.gender,
    },
    [ProfileFormFields.NickName]: {
        value: profileDetails.nickName,
    },
    [ProfileFormFields.DateOfBirth]: {
        value: profileDetails.dateOfBirth,
    },
    [ProfileFormFields.Ethnicity]: {
        value: profileDetails.ethnicity,
    },
    [ProfileFormFields.Company]: {
        value: profileDetails.workInfo.company,
    },
    [ProfileFormFields.OccupationId]: {
        value: profileDetails.workInfo.occupationId,
    },
    [ProfileFormFields.JobTitle]: {
        value: profileDetails.workInfo.jobTitle,
    },
});
