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
