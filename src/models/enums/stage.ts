enum Stages {
    SHOWCASE = 'SHOWCASE',
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
    REQUEST_TO_LOGIN_UNMATCHED = 'REQUEST_TO_LOGIN_UNMATCHED',
    REQUEST_TO_LOGIN_UNACTIVATED_ACCOUNT = 'REQUEST_TO_LOGIN_UNACTIVATED_ACCOUNT',
    REQUEST_TO_LOGIN_PREAUTH_TIMEOUT = 'REQUEST_TO_LOGIN_PREAUTH_TIMEOUT',
    LOGIN_FAILURE = 'LOGIN_FAILURE',

    // For ProfilePage
    GET_AUTHENTICATED_USER_INFO_BEGIN = 'GET_AUTHENTICATED_USER_INFO_BEGIN',
    GET_AUTHENTICATED_USER_INFO_FAILED = 'GET_AUTHENTICATED_USER_INFO_FAILED',
    REQUEST_TO_UPDATE_PROFILE_INFO_BEGIN = 'REQUEST_TO_UPDATE_PROFILE_INFO_BEGIN',
    REQUEST_TO_UPDATE_PROFILE_FAILED = 'REQUEST_TO_UPDATE_PROFILE_FAILED',
    REQUEST_TO_CHANGE_AVATAR_BEGIN = 'REQUEST_TO_CHANGE_AVATAR_BEGIN',
    REQUEST_TO_CHANGE_AVATAR_FAILED = 'REQUEST_TO_CHANGE_AVATAR_FAILED',
    REQUEST_TO_REMOVE_AVATAR_BEGIN = 'REQUEST_TO_REMOVE_AVATAR_BEGIN',
    REQUEST_TO_REMOVE_AVATAR_FAILED = 'REQUEST_TO_REMOVE_AVATAR_FAILED',
    REQUEST_TO_GET_PROFILE_INTERESTS_BEGIN = 'REQUEST_TO_GET_PROFILE_INTERESTS_BEGIN',
    REQUEST_TO_GET_PROFILE_INTERESTS_FAILED = 'REQUEST_TO_GET_PROFILE_INTERESTS_FAILED',

    // For Occupations
    GET_OCCUPATION_ITEMS_BEGIN = 'GET_OCCUPATION_ITEMS_BEGIN',
    GET_OCCUPATION_ITEMS_FAILED = 'GET_OCCUPATION_ITEMS_FAILED',
    GET_OCCUPATIONS_BEGIN = 'GET_OCCUPATIONS_BEGIN',
    GET_OCCUPATIONS_FAILED = 'GET_OCCUPATIONS_FAILED',

    // For Interests
    REQUEST_TO_GET_INTEREST_ITEMS_BEGIN = 'REQUEST_TO_GET_INTEREST_ITEMS_BEGIN',
    REQUEST_TO_GET_INTEREST_ITEMS_FAILED = 'REQUEST_TO_GET_INTEREST_ITEMS_FAILED',
    REQUEST_TO_GET_INTERESTS_BEGIN = 'REQUEST_TO_GET_INTERESTS_BEGIN',
    REQUEST_TO_GET_INTERESTS_FAILED = 'REQUEST_TO_GET_INTERESTS_FAILED',

    // For Addresses
    REQUEST_TO_GET_ADDRESS_BOOK_BEGIN = 'REQUEST_TO_ADDRESS_BOOK_BEGIN',
    REQUEST_TO_GET_ADDRESS_BOOK_FAILED = 'REQUEST_TO_GET_ADDRESS_BOOK_FAILED',
}

export default Stages;
