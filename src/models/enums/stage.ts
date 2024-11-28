enum Stages {
    HIDE_SITE_HEADER = 'HIDE_SITE_HEADER',
    PREFETCH_SITE_PUBLIC_DATA_ONGOING = 'PREFETCH_SITE_PUBLIC_DATA_ONGOING',
    SHOW_FLASHER_SERVER_ERROR = 'SHOW_FLASHER_SERVER_ERROR',
    SHOW_TOAST_CLIENT_ERROR_NETWORK = 'SHOW_TOAST_CLIENT_ERROR_NETWORK',
    PAGE_CONTENT_INITIALIZING = 'PAGE_CONTENT_INITIALIZING',

    // For ActivateAccount page
    REQUEST_TO_GET_SECRET_CODE_BEGIN = 'REQUEST_TO_GET_SECRET_CODE_BEGIN',
    REQUEST_TO_GET_SECRET_CODE_DONE = 'REQUEST_TO_GET_SECRET_CODE_DONE',
    REQUEST_TO_GET_SECRET_CODE_UNNECESSARY = 'REQUEST_TO_GET_SECRET_CODE_UNNECESSARY',
    REQUEST_TO_GET_SECRET_CODE_NO_PENDING_ACTIVATION_FOUND = 'REQUEST_TO_GET_SECRET_CODE_NO_PENDING_ACTIVATION_FOUND',
    REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED = 'REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED',
    REQUEST_TO_GET_SECRET_CODE_INVALID_EMAIL_OR_PHONE = 'REQUEST_TO_GET_SECRET_CODE_INVALID_EMAIL_OR_PHONE',

    REQUEST_TO_ACTIVATE_ACCOUNT_SECRET_CODE_MISSING = 'REQUEST_TO_ACTIVATE_ACCOUNT_SECRET_CODE_MISSING',
    REQUEST_TO_ACTIVATE_ACCOUNT_MISMATCHED_TOKENS = 'REQUEST_TO_ACTIVATE_ACCOUNT_MISMATCHED_TOKENS',
    REQUEST_TO_ACTIVATE_ACCOUNT_TOKEN_EXPIRED = 'REQUEST_TO_ACTIVATE_ACCOUNT_TOKEN_EXPIRED',
    REQUEST_TO_ACTIVATE_ACCOUNT_INVALID_SECRET_CODE = 'REQUEST_TO_ACTIVATE_ACCOUNT_INVALID_SECRET_CODE',
    REQUEST_TO_ACTIVATE_ACCOUNT_BEGIN = 'REQUEST_TO_ACTIVATE_ACCOUNT_BEGIN',
    REQUEST_TO_ACTIVATE_ACCOUNT_SUCCESS = 'REQUEST_TO_ACTIVATE_ACCOUNT_SUCCESS',

    // For RegisterAccount page
    REQUEST_TO_REGISTER_ACCOUNT_BEGIN = 'REQUEST_TO_REGISTER_ACCOUNT_BEGIN',
    REGISTER_ACCOUNT_BAD_REQUEST_INVALID_DATA = 'REGISTER_ACCOUNT_BAD_REQUEST_INVALID_DATA',
    REGISTER_ACCOUNT_CONFLICT_EMAIL_ADDRESS_OR_PHONE_NUMBER = 'REGISTER_ACCOUNT_CONFLICT_EMAIL_ADDRESS_OR_PHONE_NUMBER',
    REQUEST_TO_REGISTER_ACCOUNT_SUCCESS = 'REQUEST_TO_REGISTER_ACCOUNT_SUCCESS',

    // For LoginPage
    REQUEST_TO_LOGIN_BEGIN = 'REQUEST_TO_LOGIN_BEGIN',
    REQUEST_TO_LOGIN_SUCCESS = 'REQUEST_TO_LOGIN_SUCCESS',
    REQUEST_TO_LOGIN_BAD_REQUEST = 'REQUEST_TO_LOGIN_BAD_REQUEST',
    REQUEST_TO_LOGIN_UNACTIVATED_ACCOUNT = 'REQUEST_TO_LOGIN_UNACTIVATED_ACCOUNT',
    REQUEST_TO_LOGIN_PREAUTH_TIMEOUT = 'REQUEST_TO_LOGIN_PREAUTH_TIMEOUT',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
}

export default Stages;
