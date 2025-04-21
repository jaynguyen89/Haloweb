import { IEasternAddress, IWesternAddress } from 'src/models/Address';
import { AddressVariant } from 'src/models/enums/apiEnums';
import {
    TFormDataState,
    TValidatorOption,
    TValidatorOptionsMapFn,
    ValidatorNames,
} from 'src/utilities/data-validators/dataValidators';
import IPublicData from 'src/models/PublicData';
import { toPascalCase } from 'src/utilities/stringUtilities';
import _cloneDeep from 'lodash/cloneDeep';

export enum WesternAddressFormFields {
    Variant = 'Variant',
    BuildingName = 'BuildingName',
    PoBoxNumber = 'PoBoxNumber',
    StreetAddress = 'StreetAddress',
    Suburb = 'Suburb',
    Postcode = 'Postcode',
    DivisionId = 'DivisionId',
    CountryId = 'CountryId',
}

export enum EasternAddressFormFields {
    Variant = 'Variant',
    BuildingName = 'BuildingName',
    PoBoxNumber = 'PoBoxNumber',
    StreetAddress = 'StreetAddress',
    Lane = 'Lane',
    Group = 'Group',
    Quarter = 'Quarter',
    Hamlet = 'Hamlet',
    Commute = 'Commute',
    Ward = 'Ward',
    District = 'District',
    Town = 'Town',
    City = 'City',
    DivisionId = 'DivisionId',
    CountryId = 'CountryId',
}

export const initialWesternAddressFormState: TFormDataState<typeof WesternAddressFormFields> = {
    [WesternAddressFormFields.Variant]: { value: AddressVariant.Western },
    [WesternAddressFormFields.BuildingName]: {
        value: undefined,
        caption: undefined,
    },
    [WesternAddressFormFields.PoBoxNumber]: {
        value: undefined,
        caption: undefined,
    },
    [WesternAddressFormFields.StreetAddress]: {
        value: undefined,
        caption: undefined,
    },
    [WesternAddressFormFields.Suburb]: {
        value: undefined,
        caption: undefined,
    },
    [WesternAddressFormFields.Postcode]: {
        value: undefined,
        caption: undefined,
    },
    [WesternAddressFormFields.DivisionId]: {
        value: undefined,
        caption: undefined,
    },
    [WesternAddressFormFields.CountryId]: {
        value: undefined,
        caption: undefined,
    },
};

export const initialEasternAddressFormState: TFormDataState<typeof EasternAddressFormFields> = {
    [EasternAddressFormFields.Variant]: { value: AddressVariant.Eastern },
    [EasternAddressFormFields.BuildingName]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.PoBoxNumber]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.StreetAddress]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.Lane]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.Group]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.Quarter]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.Hamlet]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.Commute]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.Ward]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.District]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.Town]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.City]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.DivisionId]: {
        value: undefined,
        caption: undefined,
    },
    [EasternAddressFormFields.CountryId]: {
        value: undefined,
        caption: undefined,
    },
};

export const getDefaultWesternAddressData = (address: IWesternAddress): TFormDataState<typeof WesternAddressFormFields> => {
    const westernAddressData = _cloneDeep(initialWesternAddressFormState);
    Object.keys(address).forEach(key => {
        if (key !== 'variant') westernAddressData[toPascalCase(key)] = {
            value: address[key],
        };
    });
    
    return westernAddressData;
};

export const getDefaultEasternAddressData = (address: IEasternAddress): TFormDataState<typeof EasternAddressFormFields> => {
    const easternAddressData = _cloneDeep(initialEasternAddressFormState);
    Object.keys(address).forEach(key => {
        if (key !== 'variant') easternAddressData[toPascalCase(key)] = {
            value: address[key],
        };
    });

    return easternAddressData;
};

export const westernAddressFormValidatorMap = {
    [WesternAddressFormFields.BuildingName]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.PoBoxNumber]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.StreetAddress]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.Suburb]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.Postcode]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.DivisionId]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.CountryId]: ValidatorNames.RangeValidator,
};

export const easternAddressFormValidatorMap = {
    [EasternAddressFormFields.BuildingName]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.PoBoxNumber]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.StreetAddress]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.Lane]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.Group]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.Quarter]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.Hamlet]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.Commute]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.Ward]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.District]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.Town]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.City]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.DivisionId]: ValidatorNames.RangeValidator,
    [EasternAddressFormFields.CountryId]: ValidatorNames.RangeValidator,
};

export const westernAddressFormValidatorOptionsMapFn: TValidatorOptionsMapFn<TWesternAddressFormKeys> =
    (publicData?: IPublicData, extra?: unknown): TValidatorOption<TWesternAddressFormKeys> =>
({

});

export const easternAddressFormValidatorOptionsMapFn: TValidatorOptionsMapFn<TEasternAddressFormKeys> =
    (publicData?: IPublicData, extra?: unknown): TValidatorOption<TEasternAddressFormKeys> =>
({

});