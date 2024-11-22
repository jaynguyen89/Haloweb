import { ITimestamp } from 'src/commons/interfaces';
import Roles from 'src/models/enums/roles';
import { IRegionalizedPhoneNumber, IRegistrationProfileData } from 'src/models/Profile';
import { IDeviceInformation } from 'src/models/TrustedDevice';
import { TokenDestination } from 'src/commons/enums';

export interface ITokenData {
    destination: TokenDestination,
    isOtp?: boolean,
    secretCode?: string,
    currentToken?: string,
}

export interface IAuthenticatedUser extends ITimestamp {
    isAuthenticated: boolean,
    userId: string,
    username: string,
    avatarName: string,
    fullName: string,
    jwtToken: string,
    authToken: string,
    validityDuration: number,
    authTimestamp: number,
    roles: Array<Roles>,
}

export interface ILoginInformation {
    emailAddress?: string,
    phoneNumber?: IRegionalizedPhoneNumber,
}

export interface IAuthenticationData extends ILoginInformation {
    password: string,
    isTrusted?: boolean,
    deviceInformation?: IDeviceInformation,
}

export interface IRegistrationData extends IAuthenticationData {
    passwordConfirm: string,
    username: string,
    profileData?: IRegistrationProfileData,
}

export interface IAuthorization {
    accountId: string,
    roles: Array<Roles>,
    bearerToken: string,
    authorizationToken: string,
    refreshToken: string,
    authorizedTimestamp: number,
    validityDuration: number,
}
