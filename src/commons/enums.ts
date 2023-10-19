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

export enum TokenType {
    EMAIL_REGISTRATION,
    PHONE_REGISTRATION,
    ONE_TIME_PASSWORD,
    ACCOUNT_RECOVERY,
}

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
