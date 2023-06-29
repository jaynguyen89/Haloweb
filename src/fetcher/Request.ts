import axios, { AxiosError, AxiosResponse, ResponseType } from 'axios';
import { RequestMethods } from '../commons/enums';
import { InterceptorChain } from './Interceptor';
import RequestOption from './RequestOption';
import configs from '../commons/configs';

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

    public send(): Promise<T> {
        this.requestInterceptorChain?.run();

        axios.defaults.withCredentials = true; // include cookies

        const requestOptions = {
            timeout: +configs.requestTimeout,
            method: this.method,
            url: this.endpointUrl,
            headers: this.headers as Record<string, string>,
            data: this.body,
            responseType: (this.downloadResponse ? 'arraybuffer' : 'json') as ResponseType,
        };

        return axios(requestOptions).then((result: AxiosResponse<any, any> | AxiosError<unknown, any>) => {
            if (result.status !== 200)
                this.responseInterceptorChain?.run();
            else
                return (result as any).data;
        });
    }
}

export default Request;
