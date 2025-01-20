import { Ethnicity, Gender, SocialMedia } from 'src/models/enums/apiEnums';

export interface IRegistrationProfileData {
    gender?: number,
    givenName?: string,
    middleName?: string,
    familyName?: string,
    fullName?: string,
}

export interface IRegionalizedPhoneNumber {
    regionCode: string,
    phoneNumber: string,
}

export interface IProfileDetails {
    givenName?: string,
    middleName?: string,
    familyName?: string,
    fullName?: string,
    nickName?: string,
    gender: Gender,
    dateOfBirth?: Date,
    ethnicity: Ethnicity,
    workInfo: IWorkInfo,
}

interface IWorkInfo {
    occupationId?: string,
    company?: string,
    jobTitle?: string,
    profileLinks?: Array<IProfileLink>,
}

interface IProfileLink {
    linkType: SocialMedia,
    linkHref: string,
}