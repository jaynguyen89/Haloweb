class RequestOption {
    shouldRetryOnFailure: boolean;
    shouldIncludeCookies: boolean;
    retryInterval?: number;
    retryThreshold?: number;
    cookiesToIncludeByKeys?: Array<string>;

    constructor(
        shouldRetryOnFailure: boolean,
        shouldIncludeCookies: boolean,
        retryInterval?: number,
        retryThreshold?: number,
        cookiesToIncludeByKeys?: Array<string>,
    ) {
        if (shouldRetryOnFailure && (!retryInterval || !retryThreshold))
            throw new Error('Please specify \'retryInterval\' and \'retryThreshold\' when enabling \'shouldRetryOnFailure\'.');

        this.shouldRetryOnFailure = shouldRetryOnFailure;
        this.shouldIncludeCookies = shouldIncludeCookies;
        this.retryInterval = retryInterval;
        this.retryThreshold = retryThreshold;
        this.cookiesToIncludeByKeys = cookiesToIncludeByKeys;
    }
}

export default RequestOption;
