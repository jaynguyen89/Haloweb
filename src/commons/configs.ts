import * as process from 'process';

const configs = {
    environment: process.env.REACT_APP_ENVIRONMENT ?? 'development',
    devBaseUrl: process.env.REACT_APP_DEVELOPMENT_BASE_URL ?? 'https://localhost:7151/',
    testBaseUrl: process.env.REACT_APP_TEST_BASE_URL ?? '',
    uatBaseUrl: process.env.REACT_APP_UAT_BASE_URL ?? '',
    prodBaseUrl: process.env.REACT_APP_PROD_BASE_URL ?? '',
    requestTimeout: process.env.REACT_APP_REQUEST_TIMEOUT === undefined
        ? 180000
        : +process.env.REACT_APP_REQUEST_TIMEOUT,
    requestWithCredentials: process.env.REACT_APP_REQUEST_WITH_CREDENTIALS === undefined
        ? true
        : process.env.REACT_APP_REQUEST_WITH_CREDENTIALS === 'true',
    statusIndicatorsTimeout: process.env.REACT_APP_STATUS_INDICATORS_TIMEOUT === undefined
        ? null
        : +process.env.REACT_APP_STATUS_INDICATORS_TIMEOUT,
    recaptchaEnabled: process.env.REACT_APP_ENABLE_RECAPTCHA === undefined
        ? true
        : process.env.REACT_APP_ENABLE_RECAPTCHA === 'true',
    recaptchaClientKey: process.env.REACT_APP_RECAPTCHA_CLIENT_KEY ?? '',
    recaptchaVisible: process.env.REACT_APP_RECAPTCHA_VISIBLE === undefined
        ? false
        : process.env.REACT_APP_RECAPTCHA_VISIBLE === 'true',
    requestShouldRetryOnFailure: process.env.REACT_APP_REQUEST_SHOULD_RETRY_ON_FAILURE === undefined
        ? true
        : process.env.REACT_APP_REQUEST_SHOULD_RETRY_ON_FAILURE === 'true',
    requestRetryInterval: process.env.REACT_APP_REQUEST_RETRY_INTERVAL === undefined
        ? 2000
        : +process.env.REACT_APP_REQUEST_RETRY_INTERVAL,
    requestRetryThreshold: process.env.REACT_APP_REQUEST_RETRY_THRESHOLD === undefined
        ? 3
        : +process.env.REACT_APP_REQUEST_RETRY_THRESHOLD,
    debounceWaitDuration: process.env.REACT_APP_DEBOUNCE_WAIT_DURATION === undefined
        ? 1500
        : +process.env.REACT_APP_DEBOUNCE_WAIT_DURATION,
    throttleWaitDuration: process.env.REACT_APP_THROTTLE_WAIT_DURATION === undefined
        ? 1000
        : +process.env.REACT_APP_THROTTLE_WAIT_DURATION,
    cookieExpiryTime: process.env.REACT_APP_COOKIE_EXPIRY_TIME === undefined
        ? 30
        : +process.env.REACT_APP_COOKIE_EXPIRY_TIME,
    cookieMaxAge: process.env.REACT_APP_COOKIE_MAX_AGE === undefined
        ? 30
        : +process.env.REACT_APP_COOKIE_MAX_AGE,
    cookieDomain: process.env.REACT_APP_COOKIE_DOMAIN ?? 'Halogen',
    cookieSecure: process.env.REACT_APP_COOKIE_SECURE === undefined
        ? true
        : process.env.REACT_APP_COOKIE_SECURE === 'true',
    cookieHttpOnly: process.env.REACT_APP_COOKIE_HTTP_ONLY === undefined
        ? false
        : process.env.REACT_APP_COOKIE_HTTP_ONLY === 'true',
    cookieSamesite: process.env.REACT_APP_COOKIE_SAMESITE ?? 'none',
    registerAccountWithProfileData: process.env.REACT_APP_REGISTER_ACCOUNT_WITH_PROFILE_DATA === undefined
        ? false
        : process.env.REACT_APP_REGISTER_ACCOUNT_WITH_PROFILE_DATA === 'true',
    loginFailedThreshold: process.env.REACT_APP_LOGIN_FAILED_THRESHOLD === undefined
        ? 5
        : +process.env.REACT_APP_LOGIN_FAILED_THRESHOLD,
    lockedOutThreshold: process.env.REACT_APP_LOCKED_OUT_THRESHOLD === undefined
        ? 3
        : +process.env.REACT_APP_LOCKED_OUT_THRESHOLD,
    lockedOutDuration: process.env.REACT_APP_LOCKED_OUT_DURATION === undefined
        ? 900000
        : +process.env.REACT_APP_LOCKED_OUT_DURATION,
    otpMinLength: process.env.REACT_APP_OTP_MIN_LENGTH === undefined
        ? 10
        : +process.env.REACT_APP_OTP_MIN_LENGTH,
    otpMaxLength: process.env.REACT_APP_OTP_MAX_LENGTH === undefined
        ? 15
        : +process.env.REACT_APP_OTP_MAX_LENGTH,
    minAge: process.env.REACT_APP_MIN_AGE === undefined
        ? 100
        : +process.env.REACT_APP_MIN_AGE,
    maxAge: process.env.REACT_APP_MAX_AGE === undefined
        ? 10
        : +process.env.REACT_APP_MAX_AGE,
    mediaBasePath: process.env.REACT_APP_MEDIA_BASE_PATH ?? 'http://localhost:89/halocake/assets',
    avatarDir: process.env.REACT_APP_MEDIA_AVATAR_DIR ?? 'avatars',
    coverDir: process.env.REACT_APP_MEDIA_COVER_DIR ?? 'covers',
    attachmentDir: process.env.REACT_APP_MEDIA_ATTACHMENT_DIR ?? 'attachments',
    photoMaxSize: process.env.REACT_APP_PHOTO_MAX_SIZE === undefined
        ? 2000000
        : +process.env.REACT_APP_PHOTO_MAX_SIZE,
    photoAcceptedFormats: process.env.REACT_APP_PHOTO_ACCEPTED_FORMATS?.split(',') ?? ['jpg', 'jpeg', 'png', 'gif'],
};

export default configs;
