import configs from 'src/commons/configs';

class RequestOption {
    shouldIncludeCookies: boolean;
    shouldRetryOnFailure: boolean;
    retryInterval?: number;
    retryThreshold?: number;
    cookiesToIncludeByKeys?: Array<string>;

    constructor(
        shouldRetryOnFailure?: boolean,
        shouldIncludeCookies?: boolean,
        retryInterval?: number,
        retryThreshold?: number,
        cookiesToIncludeByKeys?: Array<string>,
    ) {
        if (shouldRetryOnFailure && (!retryInterval || !retryThreshold))
            throw new Error('Please specify \'retryInterval\' and \'retryThreshold\' when enabling \'shouldRetryOnFailure\'.');

        this.shouldIncludeCookies = shouldIncludeCookies ?? configs.requestWithCredentials;
        this.shouldRetryOnFailure = shouldRetryOnFailure ?? configs.requestShouldRetryOnFailure;
        this.retryInterval = retryInterval ?? configs.requestRetryInterval;
        this.retryThreshold = retryThreshold ?? configs.requestRetryThreshold;
        this.cookiesToIncludeByKeys = cookiesToIncludeByKeys;
    }
}

export default RequestOption;
