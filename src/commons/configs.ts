import * as process from 'process';

const configs = {
    environment: process.env.REACT_APP_ENVIRONMENT ?? 'development',
    devBaseUrl: process.env.REACT_APP_DEVELOPMENT_BASE_URL ?? 'https://localhost:7151/',
    testBaseUrl: process.env.REACT_APP_TEST_BASE_URL ?? '',
    uatBaseUrl: process.env.REACT_APP_UAT_BASE_URL ?? '',
    prodBaseUrl: process.env.REACT_APP_PROD_BASE_URL ?? '',
    requestTimeout: process.env.REACT_APP_REQUEST_TIMEOUT ?? '180000',
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
};

export default configs;
