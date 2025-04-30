import { IAddressData, IEasternAddress, IUnifiedAddress, IWesternAddress } from 'src/models/Address';
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
    [WesternAddressFormFields.Variant]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.BuildingName]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.PoBoxNumber]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.StreetAddress]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.Suburb]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.Postcode]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.DivisionId]: ValidatorNames.RangeValidator,
    [WesternAddressFormFields.CountryId]: ValidatorNames.RangeValidator,
};

export const easternAddressFormValidatorMap = {
    [EasternAddressFormFields.Variant]: ValidatorNames.RangeValidator,
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

export const westernAddressFormValidatorOptionsMapFn: TValidatorOptionsMapFn<typeof WesternAddressFormFields> =
    (publicData?: IPublicData, extra?: unknown): TValidatorOption<typeof WesternAddressFormFields> =>
({
    [WesternAddressFormFields.Variant]: {
        among: [AddressVariant.Western, AddressVariant.Eastern],
    },
    [WesternAddressFormFields.BuildingName]: {
        min: 1,
        max: 50,
        pattern: '^[a-zA-Z0-9 _\'.\\-]+$',
        wholePattern: true,
    },
    [WesternAddressFormFields.PoBoxNumber]: {
        min: 1,
        max: 50,
    },
    [WesternAddressFormFields.StreetAddress]: {
        min: 5,
        max: 100,
    },
    [WesternAddressFormFields.Suburb]: {
        min: 1,
        max: 100,
    },
    [WesternAddressFormFields.Postcode]: {
        min: 4,
        max: 10,
        pattern: '^[\\d]+$',
        wholePattern: true,
    },
    [WesternAddressFormFields.DivisionId]: {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        among: (extra as any).divisionIds,
    },
    [WesternAddressFormFields.CountryId]: {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        among: (extra as any).countryIds,
    },
});

export const easternAddressFormValidatorOptionsMapFn: TValidatorOptionsMapFn<typeof EasternAddressFormFields> =
    (publicData?: IPublicData, extra?: unknown): TValidatorOption<typeof EasternAddressFormFields> =>
({
    [EasternAddressFormFields.Variant]: {
        among: [AddressVariant.Western, AddressVariant.Eastern],
    },
    [EasternAddressFormFields.BuildingName]: {
        min: 1,
        max: 50,
        pattern: '^[a-zA-Z0-9 _\'.\\-]+$',
        wholePattern: true,
    },
    [EasternAddressFormFields.PoBoxNumber]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.StreetAddress]: {
        min: 5,
        max: 100,
    },
    [EasternAddressFormFields.Lane]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.Group]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.Quarter]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.Hamlet]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.Commute]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.Ward]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.District]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.Town]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.City]: {
        min: 1,
        max: 50,
    },
    [EasternAddressFormFields.DivisionId]: {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        among: (extra as any).divisionIds,
    },
    [EasternAddressFormFields.CountryId]: {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        among: (extra as any).countryIds,
    },
});

export const createAddressData = (
    variant: AddressVariant,
    formData: TFormDataState<typeof WesternAddressFormFields | typeof EasternAddressFormFields>,
): IAddressData => ({
    isForPostage: false,
    isForDelivery: false,
    isForReturn: false,
    address: {
        variant: formData[variant === AddressVariant.Western ? WesternAddressFormFields.Variant : EasternAddressFormFields.Variant],
        buildingName: formData[variant === AddressVariant.Western ? WesternAddressFormFields.BuildingName : EasternAddressFormFields.BuildingName],
        poBoxNumber: formData[variant === AddressVariant.Western ? WesternAddressFormFields.PoBoxNumber : EasternAddressFormFields.PoBoxNumber],
        streetAddress: formData[variant === AddressVariant.Western ? WesternAddressFormFields.StreetAddress : EasternAddressFormFields.StreetAddress],
        lane: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.Lane],
        group: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.Group],
        quarter: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.Quarter],
        hamlet: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.Hamlet],
        commute: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.Commute],
        ward: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.Ward],
        district: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.District],
        town: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.Town],
        city: formData[variant === AddressVariant.Western ? undefined : EasternAddressFormFields.City],
        suburb: formData[variant === AddressVariant.Western ? WesternAddressFormFields.Suburb : undefined],
        postcode: formData[variant === AddressVariant.Western ? WesternAddressFormFields.Postcode : undefined],
        divisionId: formData[variant === AddressVariant.Western ? WesternAddressFormFields.DivisionId : EasternAddressFormFields.DivisionId],
        countryId: formData[variant === AddressVariant.Western ? WesternAddressFormFields.CountryId : EasternAddressFormFields.CountryId],
    } as IUnifiedAddress,
});