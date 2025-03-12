import { DivisionType, LocalityRegion } from 'src/models/enums/apiEnums';

export interface ICountry {
    id: string,
    name: string,
    region: LocalityRegion,
}

export interface IDivision {
    id: string,
    countryId: string,
    name: string,
    divisionType: DivisionType,
    abbreviation?: string,
}

export interface ICountryData extends ICountry{
    isoCode2Char: string,
    isoCode3Char: string,
    telephoneCode?: string,
    primaryCurrencyId?: string,
    secondaryCurrencyId?: string,
}

export interface ILocality {
    country: ICountryData,
    divisions: Array<IDivision>,
}