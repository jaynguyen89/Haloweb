import { IEasternAddress, IUnifiedAddress, IWesternAddress } from 'src/models/Address';
import { AddressVariant } from 'src/models/enums/apiEnums';

export const defaultAddress: IUnifiedAddress = {
    variant: AddressVariant.Western,
    streetAddress: '',
    divisionId: '',
    countryId: '',
};

export const getDefaultUnifiedAddress = (address: IEasternAddress | IWesternAddress): IUnifiedAddress =>
    address.variant === AddressVariant.Eastern
        ? {
            variant: address.variant,
            buildingName: address.buildingName ?? undefined,
            poBoxNumber: address.poBoxNumber ?? undefined,
            streetAddress: address.streetAddress,
            lane: (address as IEasternAddress).lane ?? undefined,
            group: (address as IEasternAddress).group ?? undefined,
            quarter: (address as IEasternAddress).quarter ?? undefined,
            hamlet: (address as IEasternAddress).hamlet ?? undefined,
            commute: (address as IEasternAddress).commute ?? undefined,
            ward: (address as IEasternAddress).ward ?? undefined,
            district: (address as IEasternAddress).district ?? undefined,
            town: (address as IEasternAddress).town ?? undefined,
            city: (address as IEasternAddress).city ?? undefined,
            divisionId: address.division.id,
            countryId: address.country.id,
        }
        : {
            variant: address.variant,
            buildingName: address.buildingName ?? undefined,
            poBoxNumber: address.poBoxNumber ?? undefined,
            streetAddress: address.streetAddress,
            suburb: (address as IWesternAddress).suburb,
            postcode: (address as IWesternAddress).postcode,
            divisionId: address.division.id,
            countryId: address.country.id,
        };

