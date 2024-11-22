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
    RecaptchaToken = 'RecaptchaToken',
    TwoFactorToken = 'TwoFactorToken',
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
}

export enum HttpHeaderKeys {
    RECAPTCHA_TOKEN = 'RecaptchaToken',
    TWO_FACTOR_TOKEN = 'TwoFactorToken',
    ACCOUNT_ID = 'AccountId',
    AUTHORIZATION_TOKEN = 'AuthorizationToken',
    AUTHORIZATION = 'Authorization',
}

export enum TokenDestination { SMS, EMAIL}

export enum StorageKeys {
    AUTH_USER = 'authUser',
    AUTH_TOKEN = 'authToken',
    USER_ID = 'userId',
    USERNAME = 'username',
    USER_UNIQUE_ID = 'userUniqueId',
    USER_ROLES = 'userRoles',
    DEFAULT_THEME_INDEX = 'defaultTheme',
    DEFAULT_SITE_LANGUAGE = 'defaultSiteLanguage',
    PUBLIC_DATA = 'sitePublicData',
    ACCOUNT_ACTIVATION_SUCCESS_STORAGE_KEY = 'accountActivationSuccessMessage',
}

// Order of the formats must exactly match server side
export enum DateFormats {
    DDMMMYYYY = 'dd LL yyyy',
    WDDMMMYYYY = 'ccc, dd LLL yyyy',
    DDMMYYYYS = 'dd/LL/yyyy',
    WDDMMYYYYS = 'ccc, dd/LL/yyyy',
    DDMMYYYYD = 'dd-LL-yyyy',
    WDDMMYYYYD = 'ccc, dd-LL-yyyy',
    YYYYMMDDS = 'yyyy/LL/dd',
    YYYYMMDDD = 'yyyy-LL-dd',
}

// Order of the formats must exactly match server side
export enum TimeFormats {
    HHMMTTC = 'hh:mm a',
    HHMMC = 'HH:mm',
    HHMMTTD = 'hh.mm a',
    HHMMD = 'HH.mm',
}
