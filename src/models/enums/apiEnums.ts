export enum ActionType {
    // Common
    Add,
    Update,
    Remove,

    // AddressBook
    SetAsForShipping,
    SetAsForDelivery,
    SetAsForReturn,
}

export enum Roles {
    Customer,
    StoreOwner,
    CustomerSupport,
    Administrator,
}

export enum Gender {
    NotSpecified,
    Male,
    Female,
    MaleOther,
    FemaleOther,
}

export enum Ethnicity {
    NotSpecified,
    EastAsian,
    NorthAsian,
    SouthAsian,
    SouthEastAsian,
    WestAsian,
    CentralAsian,
    AfroAsiatic,
    NigerCongo,
    NiloSaharan,
    Khoisan,
    Austronesian,
    IndoEuropean,
    European,
    NorthAmerican,
    CentralAmerican,
    SouthAmerican,
    Caribbean,
    Oceanian,
}

export enum SocialMedia {
    Facebook,
    Google,
    Twitter,
    Instagram,
    Microsoft,
    LinkedIn,
    Youtube,
    Personal,
    Business,
}

export enum AddressVariant {
    Western,
    Eastern,
}

export enum LocalityRegion {
    Asia,
    Africa,
    Europe,
    NorthAmerica,
    Oceania,
    SouthAmerica,
}

export enum DivisionType {
    State,
    Province,
}