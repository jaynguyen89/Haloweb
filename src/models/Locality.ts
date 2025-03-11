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