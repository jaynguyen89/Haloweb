import { AddressVariant } from 'src/models/enums/apiEnums';
import { ICountry, IDivision } from 'src/models/Locality';

interface IAddress {
    id: string,
    variant: AddressVariant,
    buildingName?: string,
    poBoxNumber?: string,
    streetAddress: string,
    division: IDivision,
    country: ICountry,
    normalizedAddress?: string,
}

export interface IEasternAddress extends IAddress {
    lane?: string,
    group?: string,
    quarter?: string,
    hamlet?: string,
    commute?: string,
    ward?: string,
    district?: string,
    town?: string,
    city?: string,
}

export interface IWesternAddress extends IAddress {
    suburb: string,
    postcode: string,
}

export interface IUnifiedAddress {
    variant: AddressVariant,
    buildingName?: string,
    poBoxNumber?: string,
    streetAddress: string,
    lane?: string,
    group?: string,
    quarter?: string,
    hamlet?: string,
    commute?: string,
    ward?: string,
    district?: string,
    town?: string,
    city?: string,
    suburb?: string,
    postcode?: string,
    divisionId: string,
    countryId: string,
}

export interface IAddressData {
    isForPostage: boolean,
    isForDelivery: boolean,
    isForReturn: boolean,
    address: IUnifiedAddress,
}