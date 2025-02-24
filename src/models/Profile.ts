import { Ethnicity, Gender, SocialMedia } from 'src/models/enums/apiEnums';
import { IValueData } from 'src/models/IValueData';

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
    lastName?: string,
    fullName?: string,
    nickName?: string,
    gender: Gender,
    dateOfBirth?: string,
    ethnicity: Ethnicity,
    avatarName?: string,
    workInfo: IWorkInfo,
}

interface IWorkInfo {
    occupationId?: string,
    company?: string,
    jobTitle?: string,
    profileLinks?: Array<IProfileLink>,
}

export interface IProfileLink {
    linkType: SocialMedia,
    linkHref: string,
}

export interface IProfileUpdateData extends IValueData {
    fieldName: string,
}