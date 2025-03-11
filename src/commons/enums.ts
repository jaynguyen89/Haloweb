export enum Environments {
    DEV = 'development',
    TEST = 'test',
    UAT = 'uat',
    PROD = 'production',
}

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum RequestHeaderKeys {
    AccountId = 'AccountId',
    ProfileId = 'ProfileId',
    RecaptchaToken = 'RecaptchaToken',
    TwoFactorToken = 'TwoFactorToken',
    OTP = 'OneTimePassword',
}

export enum InterceptorTarget {
    REQUEST = 'REQUEST',
    RESPONSE = 'RESPONSE',
}

export enum RequestContentTypes {
    FORM_DATA = 'multipart/form-data',
    FORM_URL = 'application/x-www-form-urlencoded',
    JSON = 'application/json',
    HTML = 'text/html',
    PLAIN = 'text/plain',
}

export enum ControllerEndpoints {
    AUTHENTICATION = 'authentication',
    ACCOUNT = 'account',
    PROFILE = 'profile',
    PUBLIC_DATA = 'public-data',
    OCCUPATION = 'occupations',
    INTEREST = 'interests',
    ADDRESS = 'addresses',
}

export enum HttpHeaderKeys {
    RECAPTCHA_TOKEN = 'RecaptchaToken',
    TWO_FACTOR_TOKEN = 'TwoFactorToken',
    ACCOUNT_ID = 'AccountId',
    AUTHORIZATION_TOKEN = 'AuthorizationToken',
    AUTHORIZATION = 'Authorization',
}

export enum TokenDestination { SMS, EMAIL }

export enum StorageKeys {
    AUTHORIZATION = 'authorization',
    AUTHENTICATED_USER = 'authenticatedUser',
    DEFAULT_THEME_INDEX = 'defaultTheme',
    DEFAULT_SITE_LANGUAGE = 'defaultSiteLanguage',
    PUBLIC_DATA = 'sitePublicData',
    PROFILE_DETAILS = 'profileDetails',
    OCCUPATION_ITEMS = 'occupationItems',
    OCCUPATIONS = 'occupations',
    INTEREST_ITEMS = 'interestItems',
    INTERESTS = 'interests',
}

// Order of the formats must exactly match server side
export enum DateFormats {
    DDMMMYYYY = 'dd MMM yyyy', // default display
    WDDMMMYYYY = 'ddd, dd MMM yyyy',
    DDMMYYYYS = 'dd/MM/yyyy', // default logical
    WDDMMYYYYS = 'ddd, dd/MM/yyyy',
    DDMMYYYYD = 'dd-MM-yyyy',
    WDDMMYYYYD = 'ddd, dd-MM-yyyy',
    YYYYMMDDS = 'yyyy/MM/dd', // client iso
    YYYYMMDDD = 'yyyy-MM-dd',
}

// Order of the formats must exactly match server side
export enum TimeFormats {
    HHMMTTC = 'hh:mm a',
    HHMMC = 'HH:mm',
    HHMMTTD = 'hh.mm a',
    HHMMD = 'HH.mm',
}
