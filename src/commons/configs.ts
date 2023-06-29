const configs = {
    environment: process.env.REACT_APP_ENVIRONMENT ?? 'development',
    devBaseUrl: process.env.REACT_APP_DEVELOPMENT_BASE_URL ?? '',
    testBaseUrl: process.env.REACT_APP_TEST_BASE_URL ?? '',
    uatBaseUrl: process.env.REACT_APP_UAT_BASE_URL ?? '',
    prodBaseUrl: process.env.REACT_APP_PROD_BASE_URL ?? '',
    requestTimeout: process.env.REACT_APP_REQUEST_TIMEOUT ?? '180000',
};

export default configs;
