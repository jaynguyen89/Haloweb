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
        this.shouldRetryOnFailure = shouldRetryOnFailure;
        this.shouldIncludeCookies = shouldIncludeCookies;
        this.retryInterval = retryInterval;
        this.retryThreshold = retryThreshold;
        this.cookiesToIncludeByKeys = cookiesToIncludeByKeys;
    }
}

export default RequestOption;
