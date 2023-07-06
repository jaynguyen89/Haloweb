import axios, { AxiosError, AxiosResponse, ResponseType } from 'axios';
import { RequestMethods } from 'src/commons/enums';
import { InterceptorChain } from 'src/fetcher/Interceptor';
import RequestOption from 'src/fetcher/RequestOption';
import configs from 'src/commons/configs';
import { delay } from 'src/utilities/timeUtilities';

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

    public async send(callback?: Function, retryIteration: number = 1): Promise<T | undefined> {
        this.requestInterceptorChain?.runRequestInterceptors(this);

        if (this.options?.shouldIncludeCookies) axios.defaults.withCredentials = true; // include cookies

        const requestOptions = {
            timeout: +configs.requestTimeout,
            method: this.method,
            url: this.endpointUrl,
            headers: this.headers as Record<string, string>,
            data: this.body,
            responseType: (this.downloadResponse ? 'arraybuffer' : 'json') as ResponseType,
        };

        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const result: AxiosResponse<any, any> | AxiosError<unknown, any> = await axios(requestOptions);
        this.responseInterceptorChain?.runResponseInterceptors(result);

        if (result.status === 200) {
            const data = (result as AxiosResponse<any, any>).data;
            callback && callback(data);
            return data;
        }

        if (
            this.options &&
            this.options.shouldRetryOnFailure &&
            (this.options.retryThreshold || 2) >= retryIteration
        ) {
            if (this.options.retryInterval) await delay(this.options.retryInterval);

            retryIteration += 1;
            await this.send(callback, retryIteration);
        }

        return undefined;
    }
}

export default Request;
