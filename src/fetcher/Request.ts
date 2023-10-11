import axios, {
    AxiosError,
    AxiosResponse,
    ResponseType,
} from 'axios';
import { Dispatch } from 'redux';
import { RequestMethods } from 'src/commons/enums';
import { InterceptorChain } from 'src/fetcher/Interceptor';
import RequestOption from 'src/fetcher/RequestOption';
import configs from 'src/commons/configs';
import { delay } from 'src/utilities/timeUtilities';
import { IErrorCodeData } from 'src/commons/interfaces';

class Request<T> {
    endpointUrl: string;
    method: RequestMethods;
    headers: Record<string, string | undefined>;
    body?: string | FormData;
    requestInterceptorChain?: InterceptorChain;
    responseInterceptorChain?: InterceptorChain;
    options?: RequestOption;
    downloadResponse?: boolean;

    // eslint-disable-next-line max-params
    constructor(
        endpointUrl: string,
        method: RequestMethods,
        headers: Record<string, string | undefined>,
        body?: string | FormData,
        requestInterceptorChain?: InterceptorChain,
        responseInterceptorChain?: InterceptorChain,
        options?: RequestOption,
        downloadResponse?: boolean,
    ) {
        this.endpointUrl = endpointUrl;
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.requestInterceptorChain = requestInterceptorChain;
        this.responseInterceptorChain = responseInterceptorChain;
        this.options = options;
        this.downloadResponse = downloadResponse;
    }

    public async send(dispatch: Dispatch, callback?: Function, retryIteration: number = 1): Promise<T | IErrorCodeData | undefined> {
        this.requestInterceptorChain?.runRequestInterceptors(dispatch);

        if (this.options?.shouldIncludeCookies) axios.defaults.withCredentials = true; // include cookies

        const requestOptions = {
            timeout: configs.requestTimeout,
            method: this.method,
            url: this.endpointUrl,
            headers: this.headers as Record<string, string>,
            data: this.body,
            responseType: (this.downloadResponse ? 'arraybuffer' : 'json') as ResponseType,
        };

        /* eslint-disable  @typescript-eslint/no-explicit-any */
        let result: AxiosResponse<any, any> | AxiosError<unknown, any> | null = null;
        try {
            result = await axios(requestOptions);
        } catch (e) {
            this.responseInterceptorChain?.runResponseInterceptors(dispatch, e);
            return (e as AxiosError<unknown, any>).response?.data as IErrorCodeData;
        }

        if (result) {
            this.responseInterceptorChain?.runResponseInterceptors(dispatch, result);
            const data = (result as AxiosResponse<any, any>).data;

            callback && callback(dispatch, Boolean(data) ? data : result.status);
            return Boolean(data) ? data : result.status;
        }

        if (
            this.options &&
            this.options.shouldRetryOnFailure &&
            (this.options.retryThreshold || 2) >= retryIteration
        ) {
            if (this.options.retryInterval) await delay(this.options.retryInterval);

            retryIteration += 1;
            await this.send(dispatch, callback, retryIteration);
        }

        return undefined;
    }
}

export default Request;
